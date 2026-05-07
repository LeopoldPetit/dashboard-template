import { useState, useEffect } from 'react';
import { fetchDashboardOverview } from '@/services/api/dashboard';
import type { IDashboardOverview } from '@/types';

/**
 * Fetches the full dashboard overview (KPIs, charts, activity).
 * Exposes { data, loading, error }.
 */
export function useDashboardOverview() {
  const [data, setData] = useState<IDashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchDashboardOverview()
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
