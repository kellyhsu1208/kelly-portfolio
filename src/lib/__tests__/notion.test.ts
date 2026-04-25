/**
 * @jest-environment node
 */
import { mapToPortfolioItem, mapToBlogPost } from '../notion';

const mockPortfolioPage = {
  id: 'abc123',
  properties: {
    '名稱': { type: 'title', title: [{ plain_text: '品牌識別設計' }] },
    'Name': { type: 'rich_text', rich_text: [{ plain_text: 'Brand Identity Design' }] },
    '分類': { type: 'select', select: { name: '平面設計' } },
    '封面圖片': { type: 'files', files: [{ type: 'external', external: { url: 'https://example.com/cover.jpg' } }] },
    '描述': { type: 'rich_text', rich_text: [{ plain_text: '品牌視覺設計' }] },
    'Description': { type: 'rich_text', rich_text: [{ plain_text: 'Brand visual design' }] },
    '是否公開': { type: 'checkbox', checkbox: true },
    '精選': { type: 'checkbox', checkbox: true },
  },
} as any;

const mockBlogPage = {
  id: 'def456',
  properties: {
    '標題': { type: 'title', title: [{ plain_text: '我的 SEO 學習筆記' }] },
    'Title': { type: 'rich_text', rich_text: [{ plain_text: 'My SEO Learning Notes' }] },
    '封面照片': { type: 'files', files: [{ type: 'file', file: { url: 'https://s3.amazonaws.com/cover.jpg' } }] },
    '發布日期': { type: 'date', date: { start: '2026-04-20' } },
    '標籤': { type: 'multi_select', multi_select: [{ name: 'SEO' }, { name: '學習' }] },
    '是否公開': { type: 'checkbox', checkbox: true },
  },
} as any;

describe('mapToPortfolioItem', () => {
  it('maps Notion page to PortfolioItem', () => {
    const item = mapToPortfolioItem(mockPortfolioPage);
    expect(item).toEqual({
      id: 'abc123',
      title: '品牌識別設計',
      titleEn: 'Brand Identity Design',
      category: '平面設計',
      coverUrl: 'https://example.com/cover.jpg',
      description: '品牌視覺設計',
      descriptionEn: 'Brand visual design',
      isFeatured: true,
    });
  });

  it('returns empty string for missing optional fields', () => {
    const minimalPage = {
      id: 'xyz',
      properties: {
        '名稱': { type: 'title', title: [] },
        'Name': { type: 'rich_text', rich_text: [] },
        '分類': { type: 'select', select: null },
        '封面圖片': { type: 'files', files: [] },
        '描述': { type: 'rich_text', rich_text: [] },
        'Description': { type: 'rich_text', rich_text: [] },
        '是否公開': { type: 'checkbox', checkbox: false },
        '精選': { type: 'checkbox', checkbox: false },
      },
    } as any;
    const item = mapToPortfolioItem(minimalPage);
    expect(item.title).toBe('');
    expect(item.coverUrl).toBe('');
    expect(item.category).toBe('');
    expect(item.isFeatured).toBe(false);
  });
});

describe('mapToBlogPost', () => {
  it('maps Notion page to BlogPost', () => {
    const post = mapToBlogPost(mockBlogPage);
    expect(post).toEqual({
      id: 'def456',
      title: '我的 SEO 學習筆記',
      titleEn: 'My SEO Learning Notes',
      coverUrl: 'https://s3.amazonaws.com/cover.jpg',
      publishedAt: '2026-04-20',
      tags: ['SEO', '學習'],
    });
  });
});
