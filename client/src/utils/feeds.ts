// hooks/useFetchFeeds.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Brand {
  name: string;
  logo: string;
}

export interface Feed {
  briefref: string;
  brand: Brand;
  feed_title: string;
  banner_image: string;
}

export const useFetchFeeds = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const fetchFeeds = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/feeds?page=${page}`);
      setFeeds(prev => [...prev, ...response.data]);
      if (response.data.length === 0 || response.data.length < 5) {
        setHasMore(false);
      }
    } catch (err) {
      setError('An error occurred while fetching the feeds.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  return { feeds, loading, error, setPage, hasMore };
};
