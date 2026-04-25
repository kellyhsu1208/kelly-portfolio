'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PortfolioCard from './PortfolioCard';
import type { PortfolioItem, PortfolioCategory } from '@/lib/types';

type Tab = 'all' | PortfolioCategory;

interface PortfolioGridProps {
  items: PortfolioItem[];
  locale: string;
}

export default function PortfolioGrid({ items, locale }: PortfolioGridProps) {
  const t = useTranslations('portfolio');
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered =
    activeTab === 'all' ? items : items.filter((i) => i.category === activeTab);

  const tabs: { value: Tab; label: string }[] = [
    { value: 'all', label: t('all') },
    { value: '平面設計', label: t('graphic') },
    { value: '3D', label: t('threeD') },
  ];

  return (
    <div>
      <div className="flex gap-6 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`text-sm tracking-wide pb-1 border-b transition-colors ${
              activeTab === tab.value
                ? 'border-deep-brown'
                : 'border-transparent text-deep-brown/40 hover:text-deep-brown/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="columns-1 md:columns-2 gap-6">
        {filtered.map((item) => (
          <PortfolioCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </div>
  );
}
