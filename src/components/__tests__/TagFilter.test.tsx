/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import TagFilter from '../TagFilter';
import type { BlogPost } from '@/lib/types';

const messages = { blog: { allTags: '全部' } };

const posts: BlogPost[] = [
  { id: '1', title: 'SEO 入門', titleEn: 'SEO Basics', coverUrl: '', publishedAt: '2026-04-01', tags: ['SEO'] },
  { id: '2', title: '旅遊日記', titleEn: 'Travel Diary', coverUrl: '', publishedAt: '2026-04-02', tags: ['旅遊'] },
  { id: '3', title: 'SEO 進階', titleEn: 'Advanced SEO', coverUrl: '', publishedAt: '2026-04-03', tags: ['SEO'] },
];

const onFilter = jest.fn();

function renderTagFilter() {
  return render(
    <NextIntlClientProvider locale="zh" messages={messages}>
      <TagFilter posts={posts} onFilter={onFilter} locale="zh" />
    </NextIntlClientProvider>
  );
}

beforeEach(() => onFilter.mockClear());

it('renders all unique tag buttons plus 全部', () => {
  renderTagFilter();
  expect(screen.getByText('全部')).toBeInTheDocument();
  expect(screen.getByText('SEO')).toBeInTheDocument();
  expect(screen.getByText('旅遊')).toBeInTheDocument();
});

it('calls onFilter with SEO posts when SEO tag clicked', async () => {
  renderTagFilter();
  await userEvent.click(screen.getByText('SEO'));
  expect(onFilter).toHaveBeenCalledWith([posts[0], posts[2]]);
});

it('calls onFilter with all posts when 全部 clicked after filtering', async () => {
  renderTagFilter();
  await userEvent.click(screen.getByText('SEO'));
  await userEvent.click(screen.getByText('全部'));
  expect(onFilter).toHaveBeenLastCalledWith(posts);
});
