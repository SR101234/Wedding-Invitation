import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const Butterfly = ({ delay, startX, startY, scale, color }: { delay: number, startX: number, startY: number, scale: number, color: string }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-50"
      initial={{ x: startX, y: startY, scale: scale, opacity: 0 }}
      animate={{
        x: [startX, startX + 300, startX - 200, startX + 500, startX - 100],
        y: [startY, startY - 300, startY + 100, startY - 500, startY - 200],
        opacity: [0, 1, 1, 1, 0],
        rotateZ: [0, 45, -20, 30, -10]
      }}
      transition={{
        duration: 25,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="relative w-10 h-10" style={{ perspective: '1000px', transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateY(20deg)' }}>
        {/* Left Wing */}
        <motion.div
          className={`absolute left-1/2 top-0 w-1/2 h-full origin-left rounded-r-full ${color}`}
          style={{ borderTopRightRadius: '100%', borderBottomRightRadius: '50%', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)' }}
          animate={{ rotateY: [0, 75, 0] }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Right Wing */}
        <motion.div
          className={`absolute right-1/2 top-0 w-1/2 h-full origin-right rounded-l-full ${color}`}
          style={{ borderTopLeftRadius: '100%', borderBottomLeftRadius: '50%', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)' }}
          animate={{ rotateY: [0, -75, 0] }}
          transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Body */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-7 bg-amber-950 rounded-full" />
      </div>
    </motion.div>
  );
};

export default function Butterflies() {
  const [butterflies, setButterflies] = useState<{id: number, delay: number, startX: number, startY: number, scale: number, color: string}[]>([]);
  const colors = [
    'bg-gradient-to-r from-blue-400 to-purple-500',
    'bg-gradient-to-r from-orange-400 to-red-500',
    'bg-gradient-to-r from-yellow-300 to-amber-500',
    'bg-gradient-to-r from-pink-400 to-rose-500',
    'bg-gradient-to-r from-emerald-400 to-teal-500'
  ];

  useEffect(() => {
    const newButterflies = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 20,
      startX: Math.random() * window.innerWidth,
      startY: window.innerHeight + 100,
      scale: 0.4 + Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setButterflies(newButterflies);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {butterflies.map(b => (
        <Butterfly key={b.id} {...b} />
      ))}
    </div>
  );
}
