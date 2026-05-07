import { useState, useEffect } from 'react';
import { fetchTechnicalIncidents } from '@/services/api/technical';
import type { ITechnicalIncidentsResponse } from '@/types';

/**
 * Fetches the list of technical incidents and their summary.
 */
export function useTechnicalIncidents() {
  const [data, setData] = useState<ITechnicalIncidentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTechnicalIncidents()
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
