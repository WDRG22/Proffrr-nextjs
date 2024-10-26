'use client';

import Chat from "@/components/chat/Chat"
import { Navbar } from '@/components/Navbar';

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Chat />
    </div>
  );
};

export default ChatPage;
