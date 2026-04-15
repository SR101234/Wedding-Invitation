import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const Sparkle = ({ delay, startX, duration, size }: { delay: number, startX: number, duration: number, size: number }) => {
  return (
    <motion.div
      className="absolute bottom-[-50px] rounded-full bg-yellow-200 pointer-events-none z-40"
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 ${size * 4}px ${size * 1.5}px rgba(253, 224, 71, 0.8)`
      }}
      initial={{ x: startX, y: 100, opacity: 0 }}
      animate={{
        y: ['10vh', '-110vh'],
        x: [startX, startX + Math.random() * 150 - 75, startX - Math.random() * 150 + 75],
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1, 1.5, 0.5]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<{id: number, delay: number, startX: number, duration: number, size: number}[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      startX: Math.random() * window.innerWidth,
      duration: 8 + Math.random() * 10,
      size: 2 + Math.random() * 4
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {sparkles.map(s => (
        <Sparkle key={s.id} {...s} />
      ))}
    </div>
  );
}
