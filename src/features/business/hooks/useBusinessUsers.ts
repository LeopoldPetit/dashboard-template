import { useState, useEffect } from "react";
import { fetchBusinessUsers } from "@/services/api/business";
import type { IBusinessUsers } from "@/types";

/**
 * Hook exposant les données utilisateurs business (totaux, actifs, churn, évolution mensuelle).
 */
export function useBusinessUsers() {
  const [data, setData] = useState<IBusinessUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchBusinessUsers()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
