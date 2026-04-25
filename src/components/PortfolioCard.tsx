import Image from 'next/image';
import type { PortfolioItem } from '@/lib/types';

interface PortfolioCardProps {
  item: PortfolioItem;
  locale: string;
}

export default function PortfolioCard({ item, locale }: PortfolioCardProps) {
  const title = locale === 'zh' ? item.title : item.titleEn;
  const description = locale === 'zh' ? item.description : item.descriptionEn;

  return (
    <div className="break-inside-avoid mb-6 group">
      {item.coverUrl && (
        <div className="relative overflow-hidden mb-3">
          <Image
            src={item.coverUrl}
            alt={title}
            width={800}
            height={600}
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
      )}
      <p className="font-medium text-sm">{title}</p>
      {description && (
        <p className="text-xs text-deep-brown/60 mt-1">{description}</p>
      )}
    </div>
  );
}
