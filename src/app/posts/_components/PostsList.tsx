'use client';

import { Post, } from '@/lib/db';
import React, { useEffect, useState } from 'react'

export default function PostsList() {
    const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load posts");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []); // [] = run once, when the component first appears

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}