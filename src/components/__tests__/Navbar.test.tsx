/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '../Navbar';

const messages = {
  nav: { portfolio: '作品集', blog: '部落格', about: '關於我', contact: '聯絡' },
};

function renderNavbar(locale = 'zh') {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar locale={locale} />
    </NextIntlClientProvider>
  );
}

it('renders nav links', () => {
  renderNavbar();
  expect(screen.getByText('作品集')).toBeInTheDocument();
  expect(screen.getByText('部落格')).toBeInTheDocument();
  expect(screen.getByText('關於我')).toBeInTheDocument();
  expect(screen.getByText('聯絡')).toBeInTheDocument();
});

it('shows locale toggle button for other locale', () => {
  renderNavbar('zh');
  expect(screen.getByText('EN')).toBeInTheDocument();
});
