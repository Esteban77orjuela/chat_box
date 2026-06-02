import React, { useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { useChatStore } from '../../store/chatStore';
import { useSocket } from '../../hooks/useSocket';

const ChatDrawer: React.FC = () => {
  const { messages, isLoading, addMessage, setMessages } = useChatStore();
  const { sendMessage } = useSocket();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    addMessage({
      content,
      sender_type: 'user',
      timestamp: new Date().toISOString(),
    });
    sendMessage(content, messages);
  };

  if (messages.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col md:max-w-2xl mx-auto md:border-x border-white/5 shadow-2xl animate-in slide-in-from-bottom duration-500">
      <header className="flex items-center justify-between p-6 bg-brand-dark/90 backdrop-blur-2xl border-b border-white/5">
        <button
          onClick={() => setMessages([])}
          className="w-12 h-12 flex items-center justify-center glass-card rounded-2xl text-brand-light/50 hover:text-brand-light hover:bg-white/5 transition-all active:scale-90"
        >
          <X size={22} />
        </button>
        <div className="text-center">
          <h3 className="font-bold text-lg text-white">Assistant Bot 3.0</h3>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] text-brand-light/40 uppercase tracking-[0.2em] font-bold">Online</span>
          </div>
        </div>
        <div className="w-12" />
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 no-scrollbar scroll-smooth">
        {messages.map((msg, index) => (
          <ChatBubble key={index} content={msg.content} senderType={msg.sender_type} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-brand-blue font-medium text-xs px-2 animate-pulse">
            <Sparkles size={14} /> AI is crafting a response...
          </div>
        )}
      </main>

      <footer className="p-6 md:p-8 pt-2 bg-gradient-to-t from-brand-dark via-brand-dark to-transparent">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default ChatDrawer;
