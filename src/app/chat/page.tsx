'use client';

import { useChat } from 'ai/react';
import { FaPaperPlane } from 'react-icons/fa';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Navbar } from '@/components/Navbar';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust to new height
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex flex-grow flex-col items-center justify-between overflow-hidden">
        <div
          ref={scrollRef}
          className="flex flex-1 w-full overflow-y-auto"
        >
          <div className="mx-auto max-w-2xl">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mb-4">Ask me anything!</div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-full p-3 rounded-lg break-words ${
                    message.role === 'user'
                      ? 'bg-green text-white dark:bg-green-400'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                  }`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  Thinking...
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 mb-4">
                Error: {error.message}
              </div>
            )}
          </div>
        </div>

        {/* User input */}
        <div className="flex justify-center w-full pb-6">
          <form 
            onSubmit={handleSubmit} 
            className="flex items-center w-full max-w-2xl bg-green-100 rounded-3xl pl-4 pr-2 py-2"
          >
            <textarea
              value={input}
              onChange={(e) => {
                handleInputChange(e);
                adjustTextareaHeight(e);
              }}
              onKeyDown={handleKeyPress}
              placeholder="Type in your request"
              className="flex-1 w-full bg-transparent text-gray-900 placeholder-gray-500 placeholder:font-semibold resize-none rounded-md focus:outline-none"
              rows={1}
              style={{ 
                height: input ? 'auto' : '1.5rem', // Default height matches font size + padding 
                lineHeight: '1.5rem',              // Consistent line height for placeholder alignment
                minHeight: '1.5rem',               // Prevents excessive shrinking
              }}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="ml-2 p-2 text-green-700 hover:text-green-900"
              disabled={isLoading}
            >
              <FaPaperPlane size={20} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
