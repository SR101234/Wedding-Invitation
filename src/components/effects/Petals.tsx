import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const Petal = ({ delay, startX, duration }: { delay: number, startX: number, duration: number }) => {
  return (
    <motion.div
      className="absolute top-[-50px] w-4 h-6 md:w-5 md:h-7 bg-gradient-to-br from-red-500 to-red-700 rounded-full z-30"
      style={{
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '0%',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.4), 2px 2px 4px rgba(0,0,0,0.2)'
      }}
      initial={{ x: startX, y: -50, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 0 }}
      animate={{
        y: ['-10vh', '110vh'],
        x: [startX, startX + Math.random() * 200 - 100, startX + Math.random() * 200 - 100],
        rotateX: [0, 360, 720],
        rotateY: [0, 180, 360],
        rotateZ: [0, 180, 360],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default function Petals() {
  const [petals, setPetals] = useState<{id: number, delay: number, startX: number, duration: number}[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 15,
      startX: Math.random() * window.innerWidth,
      duration: 7 + Math.random() * 8
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" style={{ perspective: '1000px' }}>
      {petals.map(p => (
        <Petal key={p.id} delay={p.delay} startX={p.startX} duration={p.duration} />
      ))}
    </div>
  );
}
