import { getBlogPosts } from '@/lib/notion';
import { getTranslations } from 'next-intl/server';
import type { BlogPost } from '@/lib/types';
import BlogListClient from './BlogListClient';

export const revalidate = 3600;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch {
    // Notion not configured yet
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl mb-16">{t('title')}</h1>
      <BlogListClient posts={posts} locale={locale} />
    </div>
  );
}
