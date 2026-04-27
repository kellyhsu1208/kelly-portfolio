import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home');

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* 背景裝飾圈 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5" />
      </div>

      {/* Logo */}
      <div className="relative mb-8 animate-fade-in" style={{ animationDelay: '0ms' }}>
        <Image
          src="/logo.png"
          alt="10分慢生活"
          width={140}
          height={140}
          className="object-contain mx-auto"
          priority
        />
      </div>

      {/* 品牌名 */}
      <p
        className="text-xs tracking-[0.4em] uppercase text-accent mb-6 animate-fade-in"
        style={{ animationDelay: '100ms' }}
      >
        10分慢生活 · Embrace Slow Living
      </p>

      {/* 姓名 */}
      <h1
        className="font-serif text-5xl md:text-7xl font-light tracking-wide mb-4 animate-fade-in"
        style={{ animationDelay: '200ms' }}
      >
        許逸怜 Kelly Hsu
      </h1>

      {/* 副標 */}
      <p
        className="text-base md:text-lg text-deep-brown/50 tracking-widest uppercase mb-12 animate-fade-in"
        style={{ animationDelay: '300ms' }}
      >
        {t('tagline')}
      </p>

      {/* CTA 按鈕 */}
      <div
        className="flex flex-col sm:flex-row gap-4 animate-fade-in"
        style={{ animationDelay: '400ms' }}
      >
        <Link
          href={`/${locale}/portfolio`}
          className="bg-accent text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-accent/80 transition-colors duration-300"
        >
          {t('viewPortfolio')}
        </Link>
        <Link
          href={`/${locale}/about`}
          className="border border-sky-soft px-8 py-3 text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-colors duration-300"
        >
          {locale === 'zh' ? '關於我' : 'About Me'}
        </Link>
      </div>

      {/* 往下滾提示 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-accent animate-pulse" />
      </div>
    </section>
  );
}
