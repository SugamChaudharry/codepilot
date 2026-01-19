"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        onClick={() =>
          createProject({
            name: "new Project",
          })
        }
      >
        add new
      </Button>
      {projects?.map((project) => (
        <div className="border-2 p-2 w-1/3 " key={project._id}>
          <p>{project.name}</p>
          <p>{project.ownerId}</p>
          import status : <p>{project.importStatus}</p>
        </div>
      ))}
    </main>
  );
}
