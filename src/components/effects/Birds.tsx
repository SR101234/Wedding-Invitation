import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const Bird = ({ delay, startY, scale, duration }: { delay: number, startY: number, scale: number, duration: number }) => {
  return (
    <motion.div
      className="absolute pointer-events-none z-40"
      initial={{ x: -100, y: startY, scale: scale }}
      animate={{
        x: ['-10vw', '110vw'],
        y: [startY, startY - 150, startY + 100, startY - 200]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg width="60" height="60" viewBox="0 0 100 100" className="text-amber-900/40 fill-current">
        <motion.path 
          d="M 10 50 Q 30 20 50 50 Q 70 20 90 50 Q 70 40 50 60 Q 30 40 10 50 Z"
          animate={{ d: [
            "M 10 50 Q 30 20 50 50 Q 70 20 90 50 Q 70 40 50 60 Q 30 40 10 50 Z",
            "M 10 50 Q 30 80 50 50 Q 70 80 90 50 Q 70 60 50 40 Q 30 60 10 50 Z"
          ]}}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

export default function Birds() {
  const [birds, setBirds] = useState<{id: number, delay: number, startY: number, scale: number, duration: number}[]>([]);

  useEffect(() => {
    const newBirds = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 25,
      startY: Math.random() * (window.innerHeight * 0.7),
      scale: 0.3 + Math.random() * 0.4,
      duration: 15 + Math.random() * 15
    }));
    setBirds(newBirds);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {birds.map(b => (
        <Bird key={b.id} {...b} />
      ))}
    </div>
  );
}
