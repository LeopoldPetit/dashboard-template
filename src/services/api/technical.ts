import type {
  ITechnicalOverview,
  ITechnicalIncidentsResponse,
  IResponseTimesResponse,
} from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

export async function fetchTechnicalOverview(): Promise<ITechnicalOverview> {
  const res = await fetch(`${BASE_URL}/api/technical/overview`);
  if (!res.ok) throw new Error('Failed to fetch technical overview');
  return res.json() as Promise<ITechnicalOverview>;
}

export async function fetchTechnicalIncidents(): Promise<ITechnicalIncidentsResponse> {
  const res = await fetch(`${BASE_URL}/api/technical/incidents`);
  if (!res.ok) throw new Error('Failed to fetch technical incidents');
  return res.json() as Promise<ITechnicalIncidentsResponse>;
}

export async function fetchResponseTimes(): Promise<IResponseTimesResponse> {
  const res = await fetch(`${BASE_URL}/api/technical/response-times`);
  if (!res.ok) throw new Error('Failed to fetch response times');
  return res.json() as Promise<IResponseTimesResponse>;
}
