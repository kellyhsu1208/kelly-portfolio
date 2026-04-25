import { getTranslations } from 'next-intl/server';

const skills = [
  'Illustrator', 'Photoshop', 'Procreate', 'Blender', 'Final Cut Pro',
  'Next.js', 'SEO', 'Social Media', 'Content Strategy',
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const bioParagraphsZh = [
    '我是許逸怜，一位設計師、自媒體創作者，也是一人公司的實踐者。',
    '熱愛透過視覺設計傳達故事，正在朝向自由接案與個人品牌的方向前進。',
    '目前專注於提升設計技能、累積作品集，並透過 SEO 與內容行銷讓更多人認識我的創作。',
  ];

  const bioParagraphsEn = [
    "I'm Kelly Hsu — a designer, content creator, and solo practitioner.",
    "I love communicating stories through visual design, and I'm building toward freelance work and personal branding.",
    'Currently focused on sharpening my design skills, building my portfolio, and growing my audience through SEO and content marketing.',
  ];

  const bio = locale === 'zh' ? bioParagraphsZh : bioParagraphsEn;

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="font-serif text-5xl mb-8">{t('title')}</h1>
          {bio.map((paragraph, i) => (
            <p key={i} className="text-deep-brown/80 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
          <div className="mt-12">
            <h2 className="font-serif text-2xl mb-6">{t('skillsTitle')}</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm border border-deep-brown/30 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-deep-brown/5 aspect-[4/5] flex items-center justify-center text-deep-brown/30 text-sm">
          {locale === 'zh' ? '放上你的主照片' : 'Upload your photo here'}
        </div>
      </div>
    </div>
  );
}
