import React, { useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { useChatStore } from '../../store/chatStore';
import { apiFetch } from '../../services/api';

const ChatDrawer: React.FC = () => {
  const { messages, isLoading, addMessage, setMessages, setLoading } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // 1. Mensaje optimista (usuario)
    addMessage({
      content,
      sender_type: 'user',
      timestamp: new Date().toISOString(),
    });
    
    // 2. Llamada a la IA
    setLoading(true);
    try {
        // En un caso real, gestionaríamos el ID de la conversación dinámicamente.
        // Por ahora asumo la conversación 1. Si no existe, el endpoint debería fallar,
        // pero podemos probarlo así y ajustar si hay error 404.
        const response = await apiFetch('/chat/1/messages', {
            method: 'POST',
            body: JSON.stringify({ content })
        });

        // 3. Respuesta de la IA
        addMessage({
            content: response.content,
            sender_type: 'ai',
            timestamp: response.timestamp,
        });
    } catch (error) {
        console.error("Error al hablar con la IA:", error);
        addMessage({
            content: "Ups, la IA no pudo responder. Revisa los logs del servidor.",
            sender_type: 'ai',
            timestamp: new Date().toISOString(),
        });
    } finally {
        setLoading(false);
    }
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
