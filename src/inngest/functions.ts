import { generateText } from "ai";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import firecrawl from "@/lib/firecrawl";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});
const MAX_URL = 3;

function extractUrls(prompt: string) {
  if (!prompt || typeof prompt !== "string") return [];

  const urlRegex = /https?:\/\/[^\s]+/g;
  const matches = prompt.match(urlRegex);

  // remove duplicates (optional but useful)
  return matches ? [...new Set(matches)] : [];
}

export const demoGenrate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string };
    const urls = extractUrls(prompt).slice(0, MAX_URL);
    let scrapeContent;
    if (urls.length != 0) {
      console.log(urls);
      scrapeContent = await step.run("scrape urls", async () => {
        const results = await Promise.all(
          urls.map(async (url) => {
            const res = await firecrawl.scrape(url, {
              formats: ["markdown"],
            });

            return res.markdown ?? null;
          }),
        );
        console.log(results);
        return results
          .filter(Boolean)
          .map((s) => s?.trim())
          .join("\n\n"); // filter null and join gine two line gap
      });
    }
    const finalPrompt = scrapeContent
      ? `Context: \n ${scrapeContent} \n\n user Question : ${prompt}`
      : prompt;

    await step.run("generate-text", async () => {
      return await generateText({
        model: google("gemini-2.5-flash"),
        prompt: finalPrompt,
      });
    });
  },
);
