import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    importStatus: v.optional(
      v.union(
        v.literal("importing"),
        v.literal("completed"),
        v.literal("failed"),
      ),
    ),
    name: v.string(),
    ownerId: v.string(),
  }).index("by_owner", ["ownerId"]),
});
