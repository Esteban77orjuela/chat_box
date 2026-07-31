import { motion } from 'framer-motion';
import { Compass, Code, PenTool, Lightbulb } from 'lucide-react';

interface WelcomeProps {
  onSuggest: (text: string) => void;
}

const suggestions = [
  {
    icon: Compass,
    title: 'Explorar una idea',
    desc: 'Explicame el entrelazamiento cuantico de forma simple',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Code,
    title: 'Arquitectura',
    desc: 'Disena un backend escalable para microservicios',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: PenTool,
    title: 'Redaccion',
    desc: 'Escribe una actualizacion inspiradora para mi equipo',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  {
    icon: Lightbulb,
    title: 'Ideas',
    desc: 'Dame nombres para una startup de exploracion espacial',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
];

export function Welcome({ onSuggest }: WelcomeProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 relative z-10">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-glow">
            Hola, soy Chat Box.
          </h1>
          <p className="text-xl text-white/50 font-sans max-w-xl mx-auto">
            Que quieres resolver hoy?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((s, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.06)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggest(s.desc)}
              className="glass-panel p-6 rounded-2xl text-left border border-white/5 hover:border-white/20 group transition-colors"
            >
              <div className={s.bg + ' w-10 h-10 rounded-xl flex items-center justify-center mb-4'}>
                <s.icon className={s.color + ' w-5 h-5'} />
              </div>
              <h3 className="font-medium text-white/90 mb-1">{s.title}</h3>
              <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                {s.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
