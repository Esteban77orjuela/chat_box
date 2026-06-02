import React from 'react';
import { Bot, Bell } from 'lucide-react';
import WelcomeView from './components/views/WelcomeView';
import ChatDrawer from './components/chat/ChatDrawer';
import BottomNavigation from './components/layout/BottomNavigation';

const App: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-brand-dark font-kanit overflow-hidden text-brand-light">
      
      {/* Mobile Header / Navigation */}
      <div className="md:hidden flex items-center justify-between p-5 bg-brand-dark/95 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/30">
            <Bot size={22} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Chat Box</span>
        </div>
        <button className="p-2.5 glass-card rounded-2xl text-brand-light/70 relative active:scale-95 transition-transform">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-dark" />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full relative overflow-y-auto w-full max-w-2xl mx-auto md:border-x border-white/5 bg-gradient-to-b from-[#010823] to-[#021045] no-scrollbar">
        <WelcomeView />
        <ChatDrawer />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default App;
