import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-sky-soft py-12 mt-24">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-4">
        <Image
          src="/logo.png"
          alt="10分慢生活"
          width={40}
          height={40}
          className="object-contain opacity-60"
        />
        <p className="text-xs tracking-[0.3em] text-deep-brown/40 uppercase">Embrace Slow Living</p>
        <p className="text-xs text-deep-brown/30">© {new Date().getFullYear()} Kelly Hsu · 10分慢生活</p>
      </div>
    </footer>
  );
}
