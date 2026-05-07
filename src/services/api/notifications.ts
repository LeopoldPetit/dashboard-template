import type { INotificationsResponse } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function fetchNotifications(): Promise<INotificationsResponse> {
  const res = await fetch(`${BASE_URL}/api/notifications`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json() as Promise<INotificationsResponse>;
}
