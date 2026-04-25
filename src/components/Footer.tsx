export default function Footer() {
  return (
    <footer className="border-t border-deep-brown/10 py-8 mt-24">
      <div className="max-w-5xl mx-auto px-6 text-center text-sm text-deep-brown/50">
        © {new Date().getFullYear()} Kelly Hsu
      </div>
    </footer>
  );
}
