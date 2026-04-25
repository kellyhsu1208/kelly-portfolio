import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home');

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-serif text-6xl md:text-8xl font-light tracking-wide mb-4 animate-fade-in">
        Kelly Hsu
      </h1>
      <p className="text-lg md:text-xl text-deep-brown/60 tracking-widest uppercase mb-12">
        {t('tagline')}
      </p>
      <Link
        href={`/${locale}/portfolio`}
        className="border border-deep-brown px-8 py-3 text-sm tracking-widest uppercase hover:bg-deep-brown hover:text-cream transition-colors duration-300"
      >
        {t('viewPortfolio')}
      </Link>
    </section>
  );
}
