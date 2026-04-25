import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: () => '/zh',
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));
