import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Email', href: 'mailto:hsuyiling8213@gmail.com' },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="font-serif text-5xl mb-16">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <ContactForm />
        <div className="flex flex-col gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-accent transition-colors"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
