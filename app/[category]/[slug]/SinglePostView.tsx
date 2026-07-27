'use client';

import React from 'react';
import { PostDetail } from '@/src/components/PostDetail';
import { Post } from '@/src/types';

interface SinglePostViewProps {
  post: Post;
  relatedPosts: Post[];
  categorySlug: string;
}

export function SinglePostView({ post, relatedPosts }: SinglePostViewProps) {
  return (
    <PostDetail 
      post={post} 
      relatedPosts={relatedPosts} 
    />
  );
}
