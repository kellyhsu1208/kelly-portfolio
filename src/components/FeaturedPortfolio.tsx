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
      {/* 區塊標題 */}
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">Works</p>
        <h2 className="font-serif text-3xl md:text-4xl font-light">{t('featuredTitle')}</h2>
        <div className="mt-4 mx-auto w-12 h-px bg-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/portfolio`}
            className="group block"
          >
            {item.coverUrl && (
              <div className="relative aspect-square overflow-hidden mb-4 bg-sky-pale">
                <Image
                  src={item.coverUrl}
                  alt={locale === 'zh' ? item.title : item.titleEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
              </div>
            )}
            <p className="text-sm font-medium tracking-wide group-hover:text-accent transition-colors">
              {locale === 'zh' ? item.title : item.titleEn}
            </p>
            <p className="text-xs text-deep-brown/40 mt-1 tracking-widest uppercase">View Project →</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          href={`/${locale}/portfolio`}
          className="inline-block border border-sky-soft px-10 py-3 text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-colors duration-300"
        >
          {locale === 'zh' ? '查看全部作品' : 'View All Works'}
        </Link>
      </div>
    </section>
  );
}
