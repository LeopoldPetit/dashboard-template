import type {
  IProjectOverview,
  IProjectSprintsResponse,
  ISprint,
} from "@/types";

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

export async function postSprint(
  payload: Omit<ISprint, "id">,
): Promise<{ id: number }> {
  const res = await fetch(`${BASE_URL}/api/project/sprints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sprintId: Date.now(),
      name: payload.name,
      shortName: payload.shortName,
      storyPointsPlanned: payload.storyPointsPlanned,
      storyPointsDone: payload.storyPointsDone,
      velocityPercent: payload.velocityPercent,
      status: payload.status,
    }),
  });
  if (!res.ok) throw new Error("Failed to post sprint");
  return res.json() as Promise<{ id: number }>;
}
