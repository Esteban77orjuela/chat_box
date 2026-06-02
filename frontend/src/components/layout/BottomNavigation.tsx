import React from 'react';
import { Home, Mic, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[85%] max-w-sm glass-card border-white/10 rounded-[2.5rem] p-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[90]">
      <button className="w-14 h-14 gradient-blue rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-blue/30 transition-all hover:scale-105 active:scale-95">
        <Home size={26} />
      </button>
      <button className="w-14 h-14 flex items-center justify-center text-brand-light/30 hover:text-brand-blue transition-all hover:scale-110">
        <Mic size={26} />
      </button>
      <button className="w-14 h-14 flex items-center justify-center text-brand-light/30 hover:text-brand-blue transition-all hover:scale-110">
        <User size={26} />
      </button>
    </div>
  );
};

export default BottomNavigation;
