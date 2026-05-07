import { useState, useEffect } from 'react';
import { fetchDevOpsOverview } from '@/services/api/devops';
import type { IDevOpsOverview } from '@/types';

/**
 * Fetches DevOps overview: deployments stats, lead time, team composition.
 */
export function useDevOpsOverview() {
  const [data, setData] = useState<IDevOpsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchDevOpsOverview()
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
