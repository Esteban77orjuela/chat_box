import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full group animate-in slide-in-from-bottom-2 duration-500">
            <div className="relative flex items-center">

                {/* Visual Accent */}
                <div className="absolute left-5 text-brand-blue/40 group-focus-within:text-brand-blue group-focus-within:scale-110 transition-all duration-300">
                    <Sparkles size={20} />
                </div>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your AI agent anything..."
                    disabled={isLoading}
                    className="w-full bg-white/[0.03] backdrop-blur-3xl text-brand-light pl-14 pr-16 py-5 rounded-[2rem] border border-white/5 focus:outline-none focus:border-brand-blue/30 focus:bg-white/[0.08] transition-all font-light tracking-wide text-sm md:text-base placeholder:text-brand-light/20 shadow-2xl"
                />

                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2.5 p-3.5 gradient-blue text-white rounded-2xl hover:scale-105 active:scale-95 disabled:grayscale disabled:opacity-20 transition-all shadow-xl shadow-brand-blue/20"
                >
                    <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
                </button>
            </div>

            {/* Minimalist Hint Bar */}
            <div className="flex justify-center mt-3 opacity-30 hover:opacity-100 transition-opacity">
                <span className="text-[9px] uppercase tracking-widest font-bold text-brand-light/50">
                    Enter to send • Shift + Enter for new line
                </span>
            </div>
        </form>
    );
};

export default ChatInput;
