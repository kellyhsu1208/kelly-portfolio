'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        <Link href={`/${locale}`} className="font-serif text-xl tracking-wide" onClick={() => setOpen(false)}>
          Kelly Hsu
        </Link>

        {/* 桌機版選單 */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* 手機版右側：語言切換 + 漢堡 */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={otherLocalePath}
            className="text-xs font-medium border border-deep-brown/30 px-2 py-1 rounded"
            onClick={() => setOpen(false)}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-1"
            aria-label="選單"
          >
            <span className={`block w-5 h-px bg-deep-brown transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-deep-brown transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-deep-brown transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* 手機版下拉選單 */}
      {open && (
        <div className="md:hidden bg-cream border-t border-deep-brown/10 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide py-1 hover:text-accent transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
