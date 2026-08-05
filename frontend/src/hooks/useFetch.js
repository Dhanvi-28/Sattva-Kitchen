import { useEffect, useState, useCallback } from "react";
import api from "../services/api.js";

/**
 * Generic data-fetching hook built on the shared api instance.
 * Keeps loading/error/data state handling out of individual components.
 *
 * const { data, loading, error, refetch } = useFetch("/some-endpoint");
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url, options);
      setData(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
