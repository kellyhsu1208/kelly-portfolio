'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}/portfolio`, label: t('portfolio') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-deep-brown/10">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-serif text-xl tracking-wide">
          Kelly Hsu
        </Link>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={otherLocalePath}
            className="text-xs font-medium border border-deep-brown/30 px-2 py-1 rounded hover:border-accent hover:text-accent transition-colors"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      </nav>
    </header>
  );
}
