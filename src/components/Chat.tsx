import { useChat } from 'ai/react';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import { TbCircleLetterP } from 'react-icons/tb';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';

const UserInput: React.FC<{
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}> = ({ input, onInputChange, onSubmit, isLoading, textareaRef, onKeyPress }) => (
  <form
    onSubmit={onSubmit}
    className="flex items-center w-full max-w-2xl rounded-3xl pl-4 pr-2 py-2 bg-green-100"
  >
    <textarea
      ref={textareaRef}
      value={input}
      onChange={onInputChange}
      onKeyDown={onKeyPress}
      placeholder="Type in your request"
      className="flex-1 w-full p-1 bg-transparent text-gray-900 placeholder-gray-500 placeholder:font-semibold resize-none rounded-md focus:outline-none"
      rows={1}
      style={{
        height: 'auto',
        minHeight: '1.5rem',
        maxHeight: '16rem',
        overflowY: input.length > 150 ? 'auto' : 'hidden',
        lineHeight: '1.5rem',
      }}
      disabled={isLoading}
    />
    <button
      type="submit"
      className="ml-2 p-2 text-green-700 hover:text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading}
    >
      <FaPaperPlane size={20} />
    </button>
  </form>
);

const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      textareaRef.current?.closest('form')?.dispatchEvent(
        new SubmitEvent('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  const updateTextareaHeight = (reset = false) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = reset ? '2rem' : `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const MarkdownRenderer: React.FC<{ content: string; role: string }> = ({ content, role }) => {
    // Adjusted text color based on role and mode
    const textColor = role === 'user' ? 'text-gray-900 dark:text-gray-100' : 'text-gray-900 dark:text-gray-100';

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ children }) {
            return (
              <code className={`bg-gray-200 dark:bg-gray-700 ${textColor} p-1 rounded`}>
                {children}
              </code>
            );
          },
          pre({ children }) {
            return (
              <pre className={`bg-gray-200 dark:bg-gray-700 ${textColor} p-2 rounded overflow-x-auto`}>
                {children}
              </pre>
            );
          },
          h1: ({ children }) => <h1 className={`text-2xl font-bold ${textColor}`}>{children}</h1>,
          h2: ({ children }) => <h2 className={`text-xl font-bold ${textColor}`}>{children}</h2>,
          h3: ({ children }) => <h3 className={`text-lg font-bold ${textColor}`}>{children}</h3>,
          h4: ({ children }) => <h4 className={`text-md font-bold ${textColor}`}>{children}</h4>,
          h5: ({ children }) => <h5 className={`text-sm font-bold ${textColor}`}>{children}</h5>,
          h6: ({ children }) => <h6 className={`text-xs font-bold ${textColor}`}>{children}</h6>,
          ul: ({ children }) => <ul className={`list-disc list-inside pl-5 ${textColor}`}>{children}</ul>,
          ol: ({ children }) => <ol className={`list-decimal list-inside pl-5 ${textColor}`}>{children}</ol>,
          li: ({ children }) => <li className={`mb-1 ${textColor}`}>{children}</li>,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className={`min-w-full border border-gray-300 ${textColor}`}>{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className={`border border-gray-300 px-2 py-1 bg-gray-200 dark:bg-gray-800 ${textColor}`}>{children}</th>
          ),
          td: ({ children }) => (
            <td className={`border border-gray-300 px-2 py-1 dark:bg-gray-900 ${textColor}`}>{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-center text-lg font-semibold">
            Ask me anything!
          </div>
          <div className="flex w-full justify-center mt-6">
            <UserInput 
              input={input} 
              onInputChange={(e) => {
                handleInputChange(e);
                updateTextareaHeight();
              }}
              onSubmit={(e) => {
                handleSubmit(e);
                updateTextareaHeight(true);
              }}
              isLoading={isLoading}
              textareaRef={textareaRef}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col overflow-hidden">
          <div ref={scrollRef} className="overflow-y-auto w-full">
            <div className="mx-auto max-w-3xl w-full px-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start w-full">
                  {message.role === 'user' ? (
                    <FaUserCircle className="text-blue-500 mr-2" size={24} style={{ flexShrink: 0 }} />
                  ) : (
                    <TbCircleLetterP className="text-grey-800 dark:text-grey-200 mr-2" size={24} style={{ flexShrink: 0 }} />
                  )}
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-green text-gray-900 dark:bg-green-400'
                        : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                    }`}
                    style={{ overflow: 'visible', textAlign: 'left', maxWidth: '100%' }}
                  >
                    <MarkdownRenderer content={message.content} role={message.role} />
                  </div>
                </div>
              ))}
              {error && (
                <div className="text-left mb-4 flex items-start">
                  <TbCircleLetterP className="text-grey-800 dark:text-grey-200 mr-2" size={24} style={{ flexShrink: 0 }} />
                  <div className="text-center text-red-500 mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-800 dark:text-red-200">
                    Error: {error.message}
                  </div>
                </div>
              )}
            </div>
          </div>
  
          {/* User input pinned to the bottom when there are messages */}
          <div className="flex w-full justify-center sticky pb-6">
            <UserInput 
              input={input} 
              onInputChange={(e) => {
                handleInputChange(e);
                updateTextareaHeight();
              }}
              onSubmit={(e) => {
                handleSubmit(e);
                updateTextareaHeight(true);
              }}
              isLoading={isLoading}
              textareaRef={textareaRef}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Chat;
