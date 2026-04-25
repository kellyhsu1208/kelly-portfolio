import { getBlogPost, getBlogPosts } from '@/lib/notion';
import NotionRenderer from '@/components/NotionRenderer';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    const locales = ['zh', 'en'];
    return locales.flatMap((locale) =>
      posts.map((post) => ({ locale, slug: post.id }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const post = await getBlogPost(slug);
    const title = locale === 'zh' ? post.title : post.titleEn;
    return {
      title: `${title} — Kelly Hsu`,
      description: post.tags.join(', '),
      openGraph: {
        title,
        images: post.coverUrl ? [{ url: post.coverUrl }] : [],
      },
    };
  } catch {
    return { title: 'Post — Kelly Hsu' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  const title = locale === 'zh' ? post.title : post.titleEn;
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === 'zh' ? 'zh-TW' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <article className="max-w-2xl mx-auto px-6 py-24">
      <header className="mb-12">
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-deep-brown/50">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-4">
          {title}
        </h1>
        <p className="text-sm text-deep-brown/50">{date}</p>
      </header>
      {post.coverUrl && (
        <div className="relative aspect-video mb-12 overflow-hidden">
          <Image
            src={post.coverUrl}
            alt={title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      )}
      <NotionRenderer content={post.content} />
    </article>
  );
}
