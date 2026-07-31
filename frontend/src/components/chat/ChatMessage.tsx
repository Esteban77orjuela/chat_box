import { motion } from 'framer-motion';
import { Hexagon, User } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  senderType: 'user' | 'bot';
  isLast: boolean;
}

export function ChatMessage({ content, senderType, isLast }: ChatMessageProps) {
  const isBot = senderType === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={'flex gap-4 w-full max-w-4xl mx-auto py-6 ' + (isLast ? 'mb-4' : '')}
    >
      <div className="shrink-0 flex items-start pt-1">
        {isBot ? (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Hexagon className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center">
            <User className="w-5 h-5 text-white/70" />
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display font-medium text-white/90 text-sm">
            {isBot ? 'Chat Box' : 'Tu'}
          </span>
          <span className="text-xs text-white/30 font-sans">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className={'prose prose-invert max-w-none font-sans leading-relaxed text-[15px] ' + (isBot ? 'text-white/80' : 'text-white')}>
          {isBot ? (
            <div className="p-0 bg-transparent whitespace-pre-wrap">
              {content}
            </div>
          ) : (
            <div className="inline-block px-5 py-3 rounded-2xl rounded-tl-sm bg-gradient-to-br from-white/10 to-white/5 border border-white/5 backdrop-blur-md">
              {content}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
