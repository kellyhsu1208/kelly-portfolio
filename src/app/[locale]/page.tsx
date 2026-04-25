import { getFeaturedPortfolioItems } from '@/lib/notion';
import HeroSection from '@/components/HeroSection';
import FeaturedPortfolio from '@/components/FeaturedPortfolio';
import type { PortfolioItem } from '@/lib/types';

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let featuredItems: PortfolioItem[] = [];
  try {
    featuredItems = await getFeaturedPortfolioItems();
  } catch {
    // Notion not configured yet — show empty state
  }

  return (
    <>
      <HeroSection locale={locale} />
      {featuredItems.length > 0 && (
        <FeaturedPortfolio items={featuredItems} locale={locale} />
      )}
    </>
  );
}
