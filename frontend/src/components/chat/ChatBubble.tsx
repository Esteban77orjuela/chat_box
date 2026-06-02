import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatBubbleProps {
    content: string;
    senderType: 'user' | 'ai';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content, senderType }) => {
    const isUser = senderType === 'user';

    return (
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300`}>

            {/* Header Label / Avatar */}
            <div className={`flex items-center gap-2 px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform hover:scale-110 ${isUser ? 'bg-white/10 text-brand-light/60' : 'bg-brand-blue/20 text-brand-blue shadow-lg shadow-brand-blue/10'
                    }`}>
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-light/30 font-bold">
                    {isUser ? 'You' : 'AI Agent'}
                </span>
            </div>

            {/* Message Bubble */}
            <div
                className={`max-w-[90%] md:max-w-[85%] px-6 py-4 rounded-[2rem] shadow-xl transition-all hover:shadow-2xl ${isUser
                        ? 'gradient-blue text-white rounded-tr-none shadow-brand-blue/20'
                        : 'glass-card text-brand-light/90 rounded-tl-none border-white/5'
                    }`}
            >
                <p className="text-[15px] md:text-base leading-relaxed font-light tracking-wide whitespace-pre-wrap selection:bg-white/30">
                    {content}
                </p>
            </div>

            {/* Timestamp or Status (Optional/Subtle) */}
            <div className={`px-2 text-[9px] uppercase tracking-tighter text-brand-light/20 font-medium ${isUser ? 'text-right' : 'text-left'}`}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default ChatBubble;
