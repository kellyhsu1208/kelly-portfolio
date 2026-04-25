/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import ContactForm from '../ContactForm';

const messages = {
  contact: {
    namePlaceholder: '你的姓名',
    emailPlaceholder: '你的 Email',
    messagePlaceholder: '訊息內容',
    submit: '送出',
    success: '訊息已送出，謝謝！',
    error: '送出失敗，請稍後再試。',
  },
};

global.fetch = jest.fn();

function renderForm() {
  return render(
    <NextIntlClientProvider locale="zh" messages={messages}>
      <ContactForm />
    </NextIntlClientProvider>
  );
}

beforeEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

it('renders all form fields and submit button', () => {
  renderForm();
  expect(screen.getByPlaceholderText('你的姓名')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('你的 Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('訊息內容')).toBeInTheDocument();
  expect(screen.getByText('送出')).toBeInTheDocument();
});

it('shows success message after successful submit', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
  renderForm();

  await userEvent.type(screen.getByPlaceholderText('你的姓名'), 'Test User');
  await userEvent.type(screen.getByPlaceholderText('你的 Email'), 'test@example.com');
  await userEvent.type(screen.getByPlaceholderText('訊息內容'), 'Hello there');
  await userEvent.click(screen.getByText('送出'));

  await waitFor(() => {
    expect(screen.getByText('訊息已送出，謝謝！')).toBeInTheDocument();
  });
});

it('shows error message when submit fails', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
  renderForm();

  await userEvent.type(screen.getByPlaceholderText('你的姓名'), 'Test User');
  await userEvent.type(screen.getByPlaceholderText('你的 Email'), 'test@example.com');
  await userEvent.type(screen.getByPlaceholderText('訊息內容'), 'Hello there');
  await userEvent.click(screen.getByText('送出'));

  await waitFor(() => {
    expect(screen.getByText('送出失敗，請稍後再試。')).toBeInTheDocument();
  });
});
