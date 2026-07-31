import { motion } from 'framer-motion';
import { Send, Paperclip, Mic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto w-full p-4 z-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel rounded-3xl p-2 flex items-end gap-2 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all border border-white/10 bg-black/40 backdrop-blur-2xl"
      >
        <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0">
          <Paperclip className="w-5 h-5" />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          disabled={disabled}
          className="flex-1 max-h-[200px] min-h-[44px] bg-transparent text-white placeholder-white/30 resize-none py-3 px-2 outline-none font-sans"
          rows={1}
        />

        {input.trim() ? (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={disabled}
            className="p-3 bg-purple-500 text-white rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] shrink-0 mb-[2px] mr-[2px]"
          >
            <Send className="w-4 h-4 ml-[2px]" />
          </motion.button>
        ) : (
          <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0">
            <Mic className="w-5 h-5" />
          </button>
        )}
      </motion.div>
      <div className="text-center mt-2 text-[10px] text-white/30 font-sans tracking-wide">
        Chat Box puede cometer errores. Verifica la informacion importante.
      </div>
    </div>
  );
}
