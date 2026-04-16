import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Intro from './components/Intro';
import MainCard from './components/MainCard';
import Outro from './components/Outro';
import Petals from './components/effects/Petals';
import Butterflies from './components/effects/Butterflies';
import Birds from './components/effects/Birds';
import Sparkles from './components/effects/Sparkles';

export default function App() {
  // ADDED: A state to track if the user has clicked to enter the site
  const [hasEntered, setHasEntered] = useState(false);
  
  const [stage, setStage] = useState<'intro' | 'main' | 'outro'>('intro');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ADDED: This function handles the very first click to unlock the audio
  const handleEnterSite = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.log("Audio play error:", err));
    }
    setHasEntered(true);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fdfbf7] font-serif text-amber-900 selection:bg-amber-200 selection:text-[#8b0000]">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/song.m4a" loop />

      {/* --- THE ENTRY GATE --- */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            className="absolute inset-0 z-[200] flex items-center justify-center bg-[#5c0000] bg-cover bg-center"
            style={{ backgroundImage: `url('/intro.png')` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            <motion.button
              onClick={handleEnterSite}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-amber-50 rounded-full text-xl md:text-2xl font-['Tiro_Devanagari_Hindi'] shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-amber-200 animate-pulse"
            >
              निमंत्रण पत्र खोलें (Tap to Enter)
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Only render the rest of the site AFTER they click Enter */}
      {hasEntered && (
        <>
          {/* Floating Music Toggle Button */}
          <motion.button
            onClick={togglePlay}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-br from-[#8b0000] to-[#5c0000] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(139,0,0,0.5)] border-2 border-amber-400 text-amber-100 text-2xl"
          >
            {isPlaying ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                🎵
              </motion.div>
            ) : (
              <div className="relative">
                🎵
                <div className="absolute top-1/2 left-1/2 w-8 h-[2px] bg-amber-100 -translate-x-1/2 -translate-y-1/2 -rotate-45 shadow-sm"></div>
              </div>
            )}
          </motion.button>

          {/* Global 3D Effects & Particles */}
          <Petals />
          <Butterflies />
          <Birds />
          <Sparkles />

          {/* Page Transitions */}
          <AnimatePresence mode="wait">
            {stage === 'intro' && <Intro key="intro" onComplete={() => setStage('main')} />}
            {stage === 'main' && <MainCard key="main" onFinish={() => setStage('outro')} />}
            {stage === 'outro' && <Outro key="outro" onRestart={() => setStage('intro')} />}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}