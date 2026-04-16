import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    // Clear the auto-timer if the user clicks manually
    if (timerRef.current) clearTimeout(timerRef.current); 
    
    setIsOpen(true);
    setTimeout(() => {
      onComplete();
    }, 2000); // Wait for curtains to open before unmounting
  };

  // ADDED: Auto-open after 6 seconds
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      handleOpen();
    }, 3000);

    // Cleanup timer if component unmounts early
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-[#5c0000]">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/intro.png')` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* ... Rest of your Intro JSX remains exactly the same ... */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center relative z-50 flex flex-col items-center px-4 w-full"
            >
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 bg-amber-500 blur-[50px] opacity-30 rounded-full"></div>
                <img 
                  src="/GaneshJi.png" 
                  alt="Ganesha" 
                  className="w-44 h-44 md:w-82 md:h-82 lg:w-86 lg:h-86 object-contain" 
                  style={{ filter: 'invert(80%) sepia(50%) saturate(1000%) hue-rotate(350deg) drop-shadow(0px 10px 15px rgba(0,0,0,0.6))' }} 
                />
              </motion.div>

              <div style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.8))'}}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Tiro_Devanagari_Hindi',serif] mb-2 text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-yellow-600 whitespace-nowrap leading-[1.3] md:leading-[1.2] lg:leading-[1.15] pt-2">
                  ॥ श्री गणेशाय नमः ॥
                </h1>
              </div>
              
              <div style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}>
                <p className="text-4xl md:text-5xl lg:text-6xl font-['Great_Vibes',cursive] mt-4 mb-12 text-amber-50 tracking-wide text-center">
                  You are cordially invited
                </p>
              </div>
              
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(251, 191, 36, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3 border border-amber-400 rounded-full text-amber-50 bg-[#5c0000]/40 hover:bg-[#8b0000]/60 transition-all duration-300 font-serif tracking-[0.15em] uppercase text-sm md:text-base shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md cursor-pointer"
              >
                Open Invitation
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curtains */}
      <div className="absolute inset-0 flex pointer-events-none z-40">
        <motion.div 
          className="w-1/2 h-full bg-gradient-to-r from-[#3a0000] to-[#7a0000] border-r-[4px] border-amber-500 shadow-[20px_0_50px_rgba(0,0,0,0.9)] relative"
          animate={{ x: isOpen ? '-100%' : '0%' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
        </motion.div>
        <motion.div 
          className="w-1/2 h-full bg-gradient-to-l from-[#3a0000] to-[#7a0000] border-l-[4px] border-amber-500 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] relative"
          animate={{ x: isOpen ? '100%' : '0%' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
        </motion.div>
      </div>
    </div>
  );
}