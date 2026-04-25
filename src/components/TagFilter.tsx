'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/lib/types';

interface TagFilterProps {
  posts: BlogPost[];
  onFilter: (filtered: BlogPost[]) => void;
  locale: string;
}

export default function TagFilter({ posts, onFilter, locale }: TagFilterProps) {
  const t = useTranslations('blog');
  const [activeTag, setActiveTag] = useState<string>('all');

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  function selectTag(tag: string) {
    setActiveTag(tag);
    if (tag === 'all') {
      onFilter(posts);
    } else {
      onFilter(posts.filter((p) => p.tags.includes(tag)));
    }
  }

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      <button
        onClick={() => selectTag('all')}
        className={`text-xs px-4 py-2 rounded-full border transition-colors ${
          activeTag === 'all'
            ? 'bg-deep-brown text-cream border-deep-brown'
            : 'border-deep-brown/30 hover:border-deep-brown'
        }`}
      >
        {t('allTags')}
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => selectTag(tag)}
          className={`text-xs px-4 py-2 rounded-full border transition-colors ${
            activeTag === tag
              ? 'bg-deep-brown text-cream border-deep-brown'
              : 'border-deep-brown/30 hover:border-deep-brown'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
