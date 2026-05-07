import type { IProjectOverview, IProjectSprintsResponse } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function fetchProjectOverview(): Promise<IProjectOverview> {
  const res = await fetch(`${BASE_URL}/api/project/overview`);
  if (!res.ok) throw new Error("Failed to fetch project overview");
  return res.json() as Promise<IProjectOverview>;
}

export async function fetchProjectSprints(): Promise<IProjectSprintsResponse> {
  const res = await fetch(`${BASE_URL}/api/project/sprints`);
  if (!res.ok) throw new Error("Failed to fetch project sprints");
  return res.json() as Promise<IProjectSprintsResponse>;
}
