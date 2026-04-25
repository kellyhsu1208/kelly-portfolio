import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/types';

interface FeaturedPortfolioProps {
  items: PortfolioItem[];
  locale: string;
}

export default function FeaturedPortfolio({ items, locale }: FeaturedPortfolioProps) {
  const t = useTranslations('home');

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="font-serif text-3xl mb-12 text-center">{t('featuredTitle')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/portfolio`}
            className="group block overflow-hidden"
          >
            {item.coverUrl && (
              <div className="relative aspect-square overflow-hidden mb-3">
                <Image
                  src={item.coverUrl}
                  alt={locale === 'zh' ? item.title : item.titleEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            )}
            <p className="text-sm font-medium">
              {locale === 'zh' ? item.title : item.titleEn}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
