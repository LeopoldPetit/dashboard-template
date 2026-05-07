import type {
  ITechnicalOverview,
  ITechnicalIncidentsResponse,
  IResponseTimesResponse,
  ITechnicalIncident,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function fetchTechnicalOverview(): Promise<ITechnicalOverview> {
  const res = await fetch(`${BASE_URL}/api/technical/overview`);
  if (!res.ok) throw new Error("Failed to fetch technical overview");
  return res.json() as Promise<ITechnicalOverview>;
}

export async function fetchTechnicalIncidents(): Promise<ITechnicalIncidentsResponse> {
  const res = await fetch(`${BASE_URL}/api/technical/incidents`);
  if (!res.ok) throw new Error("Failed to fetch technical incidents");
  return res.json() as Promise<ITechnicalIncidentsResponse>;
}

export async function fetchResponseTimes(): Promise<IResponseTimesResponse> {
  const res = await fetch(`${BASE_URL}/api/technical/response-times`);
  if (!res.ok) throw new Error("Failed to fetch response times");
  return res.json() as Promise<IResponseTimesResponse>;
}

export async function postIncident(
  payload: Omit<ITechnicalIncident, "id">,
): Promise<{ id: number }> {
  const res = await fetch(`${BASE_URL}/api/technical/incidents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to post incident");
  return res.json() as Promise<{ id: number }>;
}
