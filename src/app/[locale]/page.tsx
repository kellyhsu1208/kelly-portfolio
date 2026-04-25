export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <div className="max-w-5xl mx-auto px-6 py-24">Home — {locale}</div>;
}
