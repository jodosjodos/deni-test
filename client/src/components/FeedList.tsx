// FeedList.tsx
import React, { useEffect } from 'react';
import { useFetchFeeds } from '../utils/feeds';

const FeedList: React.FC = () => {
  const { feeds, loading, error, setPage, hasMore } = useFetchFeeds();

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-wrap justify-center gap-4 m-4">
      {feeds.map(feed => (
        <div key={feed.briefref} className="w-96 border rounded shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={feed.brand.logo} alt={feed.brand.name} className="h-10 mr-2" />
              <span>{feed.brand.name}</span>
            </div>
            <a href="#" className="text-blue-600 hover:underline">Join Brief Now</a>
          </div>
          <img src={feed.banner_image} alt="Feed" className="mb-2" />
          <div className="text-left font-semibold">{feed.feed_title}</div>
        </div>
      ))}
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default FeedList;
