'use client';

import { useChat } from 'ai/react';
import { FaPaperPlane } from 'react-icons/fa';
import { Navbar } from '@/components/Navbar';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = textareaRef.current?.closest('form');
      if (form) {
        const submitEvent = new SubmitEvent('submit', { cancelable: true, bubbles: true });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  const updateTextareaHeight = (reset = false) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      if (reset) {
        textareaRef.current.style.height = '2rem';
      } else {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main
        className={`flex flex-grow flex-col items-center overflow-hidden ${
          messages.length === 0 ? 'justify-center' : 'justify-between'
        }`}
      >
        <div ref={scrollRef} className="flex w-full overflow-y-auto">
          <div className="mx-auto max-w-2xl w-full px-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mb-4">
                Ask me anything!
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`inline-block max-w-full p-3 rounded-lg break-words ${
                    message.role === 'user'
                      ? 'bg-green text-white dark:bg-green-400'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                  }`}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    textAlign: 'left',
                  }}
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
              <div className="text-center text-red-500 mb-4 p-3 rounded-lg bg-red-100">
                Error: {error.message}
              </div>
            )}
          </div>
        </div>

        <div
          className={`flex w-full justify-center pb-6 ${
            messages.length === 0 ? '' : 'sticky bottom-0 bg-transparent'
          }`}
        >
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              updateTextareaHeight(true);
            }}
            className="flex items-center w-full max-w-2xl bg-green-100 rounded-3xl pl-4 pr-2 py-2"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                handleInputChange(e);
                updateTextareaHeight();
              }}
              onKeyDown={handleKeyPress}
              placeholder="Type in your request"
              className="flex-1 w-full p-1 bg-transparent text-gray-900 placeholder-gray-500 placeholder:font-semibold resize-none rounded-md focus:outline-none"
              rows={1}
              style={{
                height: 'auto',
                minHeight: '1.5rem',
                maxHeight: '8rem',
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
        </div>
      </main>
    </div>
  );
}
