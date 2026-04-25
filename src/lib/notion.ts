import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import type { PortfolioItem, BlogPost, BlogPostWithContent, ContactSubmission } from './types';

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

function getTitle(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  return p?.type === 'title' ? (p.title[0]?.plain_text ?? '') : '';
}

function getRichText(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  return p?.type === 'rich_text' ? (p.rich_text[0]?.plain_text ?? '') : '';
}

function getCheckbox(page: PageObjectResponse, prop: string): boolean {
  const p = page.properties[prop];
  return p?.type === 'checkbox' ? p.checkbox : false;
}

function getSelect(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  return p?.type === 'select' ? (p.select?.name ?? '') : '';
}

function getMultiSelect(page: PageObjectResponse, prop: string): string[] {
  const p = page.properties[prop];
  return p?.type === 'multi_select' ? p.multi_select.map((s) => s.name) : [];
}

function getDate(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  return p?.type === 'date' ? (p.date?.start ?? '') : '';
}

function getFileUrl(page: PageObjectResponse, prop: string): string {
  const p = page.properties[prop];
  if (p?.type !== 'files' || p.files.length === 0) return '';
  const file = p.files[0];
  return file.type === 'external' ? file.external.url : file.file.url;
}

export function mapToPortfolioItem(page: PageObjectResponse): PortfolioItem {
  return {
    id: page.id,
    title: getTitle(page, '名稱'),
    titleEn: getRichText(page, 'Name'),
    category: getSelect(page, '分類') as PortfolioItem['category'],
    coverUrl: getFileUrl(page, '封面圖片'),
    description: getRichText(page, '描述'),
    descriptionEn: getRichText(page, 'Description'),
    isFeatured: getCheckbox(page, '精選'),
  };
}

export function mapToBlogPost(page: PageObjectResponse): BlogPost {
  return {
    id: page.id,
    title: getTitle(page, '標題'),
    titleEn: getRichText(page, 'Title'),
    coverUrl: getFileUrl(page, '封面照片'),
    publishedAt: getDate(page, '發布日期'),
    tags: getMultiSelect(page, '標籤'),
  };
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_PORTFOLIO_DB_ID!,
    filter: { property: '是否公開', checkbox: { equals: true } },
  });
  return (response.results as PageObjectResponse[]).map(mapToPortfolioItem);
}

export async function getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_PORTFOLIO_DB_ID!,
    filter: {
      and: [
        { property: '是否公開', checkbox: { equals: true } },
        { property: '精選', checkbox: { equals: true } },
      ],
    },
  });
  return (response.results as PageObjectResponse[]).map(mapToPortfolioItem);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_BLOG_DB_ID!,
    filter: { property: '是否公開', checkbox: { equals: true } },
    sorts: [{ property: '發布日期', direction: 'descending' }],
  });
  return (response.results as PageObjectResponse[]).map(mapToBlogPost);
}

export async function getBlogPost(pageId: string): Promise<BlogPostWithContent> {
  const page = await notion.pages.retrieve({ page_id: pageId }) as PageObjectResponse;
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const content = n2m.toMarkdownString(mdBlocks).parent;

  return {
    ...mapToBlogPost(page),
    content,
  };
}

export async function submitContact(data: ContactSubmission): Promise<void> {
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_CONTACTS_DB_ID! },
    properties: {
      '姓名': { title: [{ text: { content: data.name } }] },
      'Email': { email: data.email },
      '訊息': { rich_text: [{ text: { content: data.message } }] },
    },
  });
}
