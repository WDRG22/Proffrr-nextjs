import React, { useEffect, RefObject } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface UserInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const UserInput: React.FC<UserInputProps> = ({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  textareaRef,
  onKeyPress,
}) => {
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input, textareaRef]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center w-full max-w-2xl rounded-3xl pl-4 pr-2 py-2 bg-green-100"
      role="form"
      aria-label="Chat message input"
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyPress}
        placeholder="Type in your request"
        className="flex-1 w-full p-1 bg-transparent resize-none rounded-md focus:outline-none text-gray-900 placeholder:text-gray-600"
        rows={1}
        style={{
          minHeight: '1.5rem',
          maxHeight: '16rem',
          overflowY: input.length > 150 ? 'auto' : 'hidden',
          lineHeight: '1.5rem',
        }}
        disabled={isLoading}
        aria-label="Message input"
        aria-disabled={isLoading}
      />
      <button
        type="submit"
        className="ml-2 p-2 rounded-full text-green-700 hover:text-gray-800 hover:bg-gray-300"
        disabled={isLoading}
        aria-label="Send message"
      >
        <FaPaperPlane size={20} />
      </button>
    </form>
  );
};

export default UserInput;
