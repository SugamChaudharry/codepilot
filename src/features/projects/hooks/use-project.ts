import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useProjectById = (projectId: Id<"projects">) => {
  return useQuery(api.projects.getByID, { projectId });
};

export const useProjects = () => {
  return useQuery(api.projects.getAll);
};

export const usePartialProjects = (limit: number) => {
  return useQuery(api.projects.getPartial, { limit });
};

export const useCreateProject = () => {
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localStore, args) => {
      const existingProjects = localStore.getQuery(api.projects.getAll);

      if (existingProjects !== undefined) {
        const now = Date.now();
        const newProject = {
          _id: crypto.randomUUID() as Id<"projects">,
          _creationTime: now,
          name: args.name,
          ownerId: "anonymous",
          updatedAt: now,
        };

        localStore.setQuery(api.projects.getAll, {}, [
          newProject,
          ...existingProjects,
        ]);
      }
    },
  );
};
