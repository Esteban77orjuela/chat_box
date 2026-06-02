import React, { useState } from 'react';
import { Bell, Sparkles, ChevronRight, Music, Clapperboard, Bot } from 'lucide-react';

const WelcomeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Entertainment');

  return (
    <div className="px-6 pt-8 pb-4 space-y-8">
      <div className="flex justify-between items-start animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-medium text-brand-light/60">Hello,</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Esteban Orjuela</h1>
          <p className="text-brand-light/30 pt-1 font-light italic">Ready to explore with your AI Agent?</p>
        </div>
        <div className="hidden md:block">
          <button className="p-3.5 glass-card rounded-2xl text-brand-light/50 hover:text-brand-blue hover:bg-white/5 transition-all active:scale-90">
            <Bell size={24} />
          </button>
        </div>
      </div>

      <div className="gradient-blue p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-brand-blue/10 animate-in zoom-in-95 duration-700">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            <Sparkles size={12} />
            Exclusive Offer
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Premium Plan</h3>
            <p className="text-white/80 text-sm max-w-[180px] leading-relaxed font-light mt-1">
              Get full access to the world's most powerful AI models.
            </p>
          </div>
          <button className="px-7 py-3 bg-white text-brand-blue font-bold rounded-2xl text-sm transition-all hover:shadow-xl active:scale-95 shadow-lg">
            Upgrade Now
          </button>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-20 transition-transform duration-700 group-hover:scale-110">
          <Bot size={180} />
        </div>
      </div>

      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xl font-bold text-white tracking-tight">Features</h3>
          <button className="text-brand-blue text-sm font-semibold hover:text-brand-light transition-colors flex items-center gap-1 group">
            See all <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {['Entertainment', 'Article', 'Academic', 'Creative'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-3.5 rounded-3xl font-semibold transition-all duration-300 border ${activeTab === tab
                ? 'bg-white text-brand-dark border-white shadow-2xl shadow-white/10 scale-105'
                : 'glass-card border-white/5 text-brand-light/40 hover:text-brand-light/80'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 pb-40">
        <div className="glass-card p-6 rounded-[2.5rem] space-y-4 cursor-pointer hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-[1.25rem] bg-[#2DD4BF]/10 flex items-center justify-center text-[#2DD4BF] group-hover:scale-110 transition-transform">
            <Music size={28} />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg lowercase">Songs/lyrics</h4>
            <p className="text-xs text-brand-light/30 leading-relaxed font-light mt-1">Write high-quality lyrics and musical structures.</p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-[2.5rem] space-y-4 cursor-pointer hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-[1.25rem] bg-[#FACC15]/10 flex items-center justify-center text-[#FACC15] group-hover:scale-110 transition-transform">
            <Clapperboard size={28} />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg lowercase">Movie script</h4>
            <p className="text-xs text-brand-light/30 leading-relaxed font-light mt-1">Develop award-winning scripts and dialogue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
