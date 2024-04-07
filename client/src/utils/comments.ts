// useFetchComments.ts
import { useEffect, useState } from 'react';
// interfaces.ts
export interface Comment {
  bcommentref: string;
  briefref: string;
  user: {
    userref: string;
    name: string;
    avatar: string;
  };
  comment: string;
  submitted_on: string;
}


const useFetchComments = (briefref: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/comments/${briefref}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [briefref]);

  return { comments, loading, error };
};

export default useFetchComments;
