import type { IDevOpsOverview, IDevOpsTeam } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function fetchDevOpsOverview(): Promise<IDevOpsOverview> {
  const res = await fetch(`${BASE_URL}/api/devops/overview`);
  if (!res.ok) throw new Error("Failed to fetch devops overview");
  return res.json() as Promise<IDevOpsOverview>;
}

export async function postDevOpsOverview(payload: {
  deployTotal: number;
  deploySuccessful: number;
  deployFailed: number;
  changeFailureRate: number;
  frequencyPerDay: number;
  periodDays: number;
  leadTimeAvgDays: number;
  teamDevelopers: number;
  teamDevops: number;
  teamProductOwner: number;
  teamCto: number;
}): Promise<{ id: number }> {
  const res = await fetch(`${BASE_URL}/api/devops/overview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to post devops overview");
  return res.json() as Promise<{ id: number }>;
}

export type { IDevOpsTeam };
