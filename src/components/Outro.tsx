import { motion } from 'motion/react';

export default function Outro({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div
      // Removed the gradient background and added bg-cover, bg-center, bg-no-repeat
      className="absolute inset-0 flex flex-col items-center justify-center text-amber-200 z-40 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/Outro.png')` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Kept your arabesque pattern overlay for extra texture (optional) */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay pointer-events-none"></div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="text-center space-y-10 px-6 relative z-10"
      >
        <h2 className="text-6xl md:text-8xl font-['Great_Vibes'] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 pt-4 pb-4">
          Thank You
        </h2>
        
        <p className="text-2xl md:text-3xl font-['Tiro_Devanagari_Hindi'] text-amber-100">
          We look forward to your presence.
        </p>
        
        <div className="max-w-xl mx-auto bg-black/20 p-8 rounded-2xl backdrop-blur-sm border border-amber-500/20">
          <p className="text-xl md:text-2xl text-amber-300 font-['Tiro_Devanagari_Hindi'] leading-relaxed">
            "न कोई ड्यूटी न कोई दफ्तर न कोई प्यारा सा बहाना,<br/>
            हमारी बुआ/मौसी की शादी में जलूल-जलूल आना"
          </p>
          <p className="mt-6 text-amber-400/80 font-['Tiro_Devanagari_Hindi'] text-lg">
            - बाल आकांक्षा : मान्या (पिहू) / भावेश / हार्दिक
          </p>
        </div>

        <motion.button 
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-8 py-3 rounded-full border border-amber-500/50 text-amber-200 hover:bg-amber-500/20 transition-colors"
        >
          View Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}