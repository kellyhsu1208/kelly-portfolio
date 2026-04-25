import { getPortfolioItems } from '@/lib/notion';
import PortfolioGrid from '@/components/PortfolioGrid';
import { getTranslations } from 'next-intl/server';
import type { PortfolioItem } from '@/lib/types';

export const revalidate = 3600;

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio' });

  let items: PortfolioItem[] = [];
  try {
    items = await getPortfolioItems();
  } catch {
    // Notion not configured yet
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl mb-16">{t('title')}</h1>
      <PortfolioGrid items={items} locale={locale} />
    </div>
  );
}
