'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <p className="text-accent text-sm py-4">{t('success')}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-lg">
      <input
        {...register('name')}
        placeholder={t('namePlaceholder')}
        className="bg-transparent border-b border-deep-brown/30 pb-3 text-sm focus:outline-none focus:border-deep-brown placeholder:text-deep-brown/40"
      />
      <input
        {...register('email')}
        type="email"
        placeholder={t('emailPlaceholder')}
        className="bg-transparent border-b border-deep-brown/30 pb-3 text-sm focus:outline-none focus:border-deep-brown placeholder:text-deep-brown/40"
      />
      <textarea
        {...register('message')}
        placeholder={t('messagePlaceholder')}
        rows={5}
        className="bg-transparent border-b border-deep-brown/30 pb-3 text-sm focus:outline-none focus:border-deep-brown placeholder:text-deep-brown/40 resize-none"
      />
      {status === 'error' && (
        <p className="text-red-500 text-xs">{t('error')}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start border border-deep-brown px-8 py-3 text-sm tracking-widest uppercase hover:bg-deep-brown hover:text-cream transition-colors disabled:opacity-50"
      >
        {t('submit')}
      </button>
    </form>
  );
}
