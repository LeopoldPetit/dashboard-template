import type { IBusinessOverview, IBusinessUsers } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function fetchBusinessOverview(): Promise<IBusinessOverview> {
  const res = await fetch(`${BASE_URL}/api/business/overview`);
  if (!res.ok) throw new Error("Failed to fetch business overview");
  return res.json() as Promise<IBusinessOverview>;
}

export async function fetchBusinessUsers(): Promise<IBusinessUsers> {
  const res = await fetch(`${BASE_URL}/api/business/users`);
  if (!res.ok) throw new Error("Failed to fetch business users");
  return res.json() as Promise<IBusinessUsers>;
}

export async function postBusinessUsers(
  payload: IBusinessUsers["users"],
): Promise<{ id: number }> {
  const res = await fetch(`${BASE_URL}/api/business/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      total: payload.total,
      activeMonthly: payload.activeMonthly,
      startOfMonth: payload.startOfMonth,
      endOfMonth: payload.endOfMonth,
      newThisMonth: payload.newThisMonth,
      churnedThisMonth: payload.churnedThisMonth,
    }),
  });
  if (!res.ok) throw new Error("Failed to post business users");
  return res.json() as Promise<{ id: number }>;
}
