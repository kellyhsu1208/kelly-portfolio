import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const title = locale === 'zh' ? post.title : post.titleEn;
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === 'zh' ? 'zh-TW' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Link href={`/${locale}/blog/${post.id}`} className="group block">
      {post.coverUrl && (
        <div className="relative aspect-video overflow-hidden mb-4">
          <Image
            src={post.coverUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
      )}
      <div className="flex gap-2 mb-2">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs text-deep-brown/50">
            #{tag}
          </span>
        ))}
      </div>
      <h2 className="font-serif text-xl mb-1 group-hover:text-accent transition-colors">
        {title}
      </h2>
      <p className="text-xs text-deep-brown/50">{date}</p>
    </Link>
  );
}
