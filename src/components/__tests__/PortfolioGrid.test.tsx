/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import PortfolioGrid from '../PortfolioGrid';
import type { PortfolioItem } from '@/lib/types';

const messages = {
  portfolio: { all: '全部', graphic: '平面設計', threeD: '3D' },
};

const items: PortfolioItem[] = [
  {
    id: '1',
    title: '品牌設計',
    titleEn: 'Brand Design',
    category: '平面設計',
    coverUrl: '',
    description: '',
    descriptionEn: '',
    isFeatured: false,
  },
  {
    id: '2',
    title: '3D 場景',
    titleEn: '3D Scene',
    category: '3D',
    coverUrl: '',
    description: '',
    descriptionEn: '',
    isFeatured: false,
  },
];

function renderGrid() {
  return render(
    <NextIntlClientProvider locale="zh" messages={messages}>
      <PortfolioGrid items={items} locale="zh" />
    </NextIntlClientProvider>
  );
}

it('shows all items by default', () => {
  renderGrid();
  expect(screen.getByText('品牌設計')).toBeInTheDocument();
  expect(screen.getByText('3D 場景')).toBeInTheDocument();
});

it('filters to 平面設計 when tab clicked', async () => {
  renderGrid();
  await userEvent.click(screen.getByText('平面設計'));
  expect(screen.getByText('品牌設計')).toBeInTheDocument();
  expect(screen.queryByText('3D 場景')).not.toBeInTheDocument();
});

it('filters to 3D when tab clicked', async () => {
  renderGrid();
  await userEvent.click(screen.getByText('3D'));
  expect(screen.queryByText('品牌設計')).not.toBeInTheDocument();
  expect(screen.getByText('3D 場景')).toBeInTheDocument();
});
