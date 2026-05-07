import type { IDashboardOverview } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function fetchDashboardOverview(): Promise<IDashboardOverview> {
  const res = await fetch(`${BASE_URL}/api/dashboard/overview`);
  if (!res.ok) throw new Error("Failed to fetch dashboard overview");
  return res.json() as Promise<IDashboardOverview>;
}
