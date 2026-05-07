import { useState, useEffect, useCallback } from "react";
import { fetchBusinessUsers } from "@/services/api/business";
import type { IBusinessUsers } from "@/types";

/**
 * Hook exposant les données utilisateurs business (totaux, actifs, churn, évolution mensuelle).
 * Exposes { data, loading, error, refetch }.
 */
export function useBusinessUsers() {
  const [data, setData] = useState<IBusinessUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    fetchBusinessUsers()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [tick]);

  return { data, loading, error, refetch };
}
