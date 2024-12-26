// hooks/useCache.js
import { useState, useEffect } from 'react';
import { cacheManager } from '../utils/cache';

export const useCache = (key, fetcher, ttl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache first
        const cachedData = cacheManager.get(key);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const freshData = await fetcher();
        await cacheManager.set(key, freshData, ttl);
        setData(freshData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, fetcher, ttl]);

  return { data, loading, error };
};

