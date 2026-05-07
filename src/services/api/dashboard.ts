import type { IDashboardOverview, IActivityItem } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function fetchDashboardOverview(): Promise<IDashboardOverview> {
  const res = await fetch(`${BASE_URL}/api/dashboard/overview`);
  if (!res.ok) throw new Error("Failed to fetch dashboard overview");
  return res.json() as Promise<IDashboardOverview>;
}

export async function postActivity(
  payload: Pick<IActivityItem, "label" | "time" | "severity">,
): Promise<{ id: number }> {
  const res = await fetch(`${BASE_URL}/api/dashboard/activity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to post activity");
  return res.json() as Promise<{ id: number }>;
}
