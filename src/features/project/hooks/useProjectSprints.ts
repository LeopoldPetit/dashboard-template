import { useState, useEffect } from 'react';
import { fetchProjectSprints } from '@/services/api/project';
import type { IProjectSprintsResponse } from '@/types';

/**
 * Fetches sprint data and summary (velocity, story points planned vs done).
 */
export function useProjectSprints() {
  const [data, setData] = useState<IProjectSprintsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProjectSprints()
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
