import { useChat } from 'ai/react';
import { FaUserCircle } from 'react-icons/fa';
import { TbCircleLetterP } from 'react-icons/tb';
import { useEffect, useRef } from 'react';
import MarkdownRenderer from "@/components/chat/MarkdownRenderer";
import UserInput from "@/components/chat/UserInput";

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

  return (
    <main className="flex flex-col h-screen overflow-hidden">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col w-full max-w-3xl justify-center items-start mt-6">
            <h1 className="text-center text-4xl font-semibold">Get the best tire deals</h1>
            <h1 className="text-center text-4xl font-semibold">Tell us about your vehicle</h1>
          </div>
          <div className="flex w-full max-w-3xl justify-center mt-6">
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
        <>    
        <div className='w-full max-w-3xl self-center my-6'>
          <h1>you can <a href="/auth/signin" className='underline'>sign in</a> or <a href="/auth/signup" className='underline'>sign up</a> to continue</h1>
        </div>
          <div className="flex-1 overflow-y-auto w-full" ref={scrollRef}>
            <div className="mx-auto max-w-3xl w-full px-4 space-y-4">
                {messages.map((message) => (
                <div key={message.id} className="flex items-start w-full">
                    {message.role === 'user' ? (
                    <FaUserCircle className="text-blue-500 mr-2" size={26} style={{ flexShrink: 0 }} />
                    ) : (
                    <TbCircleLetterP className="text-grey-800 dark:text-grey-200 mr-2" size={28} style={{ flexShrink: 0 }} />
                    )}
                    <div
                    className={`inline-block p-3 rounded-lg ${
                        message.role === 'user'
                        ? 'bg-green-400' 
                        : 'bg-gray-100 text-gray-900 dark:bg-gray-800'
                    }`}
                    id={message.role}
                    style={{ overflow: 'visible', textAlign: 'left', maxWidth: '100%' }}
                    >
                    <MarkdownRenderer content={message.content} role={message.role} />
                    </div>
                </div>
                ))}
                {error && (
                <div className="text-left mb-4 flex items-start">
                    <TbCircleLetterP className="text-grey-800 dark:text-grey-200 mr-2" size={28} style={{ flexShrink: 0 }} />
                    <div className="text-center text-red-500 mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-800 dark:text-red-200">
                    Error: {error.message}
                    </div>
                </div>
                )}
            </div>
            </div>
            <div className="flex justify-center pb-8">
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
        </>
      )}
    </main>
  );
};

export default Chat;
