import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface NotionRendererProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl font-light mt-12 mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl font-light mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif text-xl mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="leading-relaxed mb-6 text-deep-brown/80">{children}</p>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ''} className="w-full my-8" />
  ),
};

export default function NotionRenderer({ content }: NotionRendererProps) {
  return (
    <div className="prose prose-stone max-w-none">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
