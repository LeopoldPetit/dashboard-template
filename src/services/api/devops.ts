import type { IDevOpsOverview } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

export async function fetchDevOpsOverview(): Promise<IDevOpsOverview> {
  const res = await fetch(`${BASE_URL}/api/devops/overview`);
  if (!res.ok) throw new Error('Failed to fetch devops overview');
  return res.json() as Promise<IDevOpsOverview>;
}
