import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  role: "function" | "data" | "system" | "user" | "assistant" | "tool";
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, role, className = '' }) => {
  const baseTextStyle = role === 'user' ? 'bg-green-400 text-gray-900' : 'text-gray-900 dark:text-gray-100'
  
  const components: Partial<Components> = {
    code({ className, children, node, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = node?.position?.start.line === node?.position?.end.line;
      
      return isInline ? (
        <code className={`${baseTextStyle} p-1 rounded font-mono ${className || ''}`} {...props}>
          {children}
        </code>
      ) : (
        <pre className={`bg-gray-200 dark:bg-gray-700 ${baseTextStyle} p-4 rounded-lg overflow-x-auto my-4`}>
          <code className={match ? `language-${match[1]}` : ''} {...props}>
            {children}
          </code>
        </pre>
      );
    },
    pre({ children }) {
      return <>{children}</>;
    },
    h1({ children }) {
      return <h1 className={`text-2xl font-bold ${baseTextStyle} my-4`}>{children}</h1>;
    },
    h2({ children }) {
      return <h2 className={`text-xl font-bold ${baseTextStyle} my-3`}>{children}</h2>;
    },
    h3({ children }) {
      return <h3 className={`text-lg font-bold ${baseTextStyle} my-2`}>{children}</h3>;
    },
    ul({ children }) {
      return (
        <ul className={`list-disc list-inside pl-5 ${baseTextStyle} my-2 space-y-1`}>
          {children}
        </ul>
      );
    },
    ol({ children }) {
      return (
        <ol className={`list-decimal list-inside pl-5 ${baseTextStyle} my-2 space-y-1`}>
          {children}
        </ol>
      );
    },
    p({ children }) {
      return <p className={`${baseTextStyle} my-2`}>{children}</p>;
    },
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4">
          <table className={`min-w-full border-collapse border border-gray-300 ${baseTextStyle}`}>
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-200 dark:bg-gray-700">{children}</thead>;
    },
    th({ children }) {
      return <th className="border border-gray-400 px-4 py-2 text-left">{children}</th>;
    },
    td({ children }) {
      return <td className="border border-gray-400 px-4 py-2">{children}</td>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
          {children}
        </blockquote>
      );
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
      className={className}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
