import { motion } from 'framer-motion';
import { Plus, MessageSquare, Hexagon, LogOut, Settings } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';

export function Sidebar() {
  const { conversations, setActiveConversation, activeConversationId, clearChat } = useChatStore();
  const { user, logout } = useAuthStore();

  const handleNewChat = () => {
    clearChat();
    setActiveConversation(0);
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen glass-panel border-l-0 border-y-0 flex flex-col relative z-20 flex-shrink-0"
    >
      <div className="p-6 pb-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
          <Hexagon className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-semibold tracking-wide text-lg text-white">Chat Box</span>
      </div>

      <div className="px-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="w-full glass-panel py-3 px-4 rounded-xl flex items-center justify-between text-sm font-medium text-white/90 border border-white/10 hover:border-purple-500/30 transition-colors group"
        >
          Nueva conversacion
          <Plus className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3 px-2">
          Recientes
        </div>

        {conversations.map((chat) => (
          <motion.button
            key={chat.id}
            onClick={() => setActiveConversation(chat.id)}
            className={
              'w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ' +
              (activeConversationId === chat.id
                ? 'bg-gradient-to-r from-purple-500/20 to-transparent border-l-2 border-purple-500 text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white')
            }
          >
            <MessageSquare className={activeConversationId === chat.id ? 'w-4 h-4 text-purple-400' : 'w-4 h-4'} />
            <span className="truncate text-sm">{chat.title}</span>
          </motion.button>
        ))}
      </div>

      <div className="p-4 mt-auto border-t border-white/5">
        {user && (
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              {user.username[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.username}</p>
              <p className="text-[10px] text-white/30 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <Settings className="w-4 h-4" />
          Ajustes
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </button>
      </div>
    </motion.aside>
  );
}
