'use client';

import { useState } from 'react';
import TagFilter from '@/components/TagFilter';
import BlogCard from '@/components/BlogCard';
import type { BlogPost } from '@/lib/types';

interface BlogListClientProps {
  posts: BlogPost[];
  locale: string;
}

export default function BlogListClient({ posts, locale }: BlogListClientProps) {
  const [filtered, setFiltered] = useState(posts);

  return (
    <>
      <TagFilter posts={posts} onFilter={setFiltered} locale={locale} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </>
  );
}
