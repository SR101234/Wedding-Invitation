import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Intro from './components/Intro';
import MainCard from './components/MainCard';
import Outro from './components/Outro';
import Petals from './components/effects/Petals';
import Butterflies from './components/effects/Butterflies';
import Birds from './components/effects/Birds';
import Sparkles from './components/effects/Sparkles';

export default function App() {
  const [stage, setStage] = useState<'intro' | 'main' | 'outro'>('intro');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fdfbf7] font-serif text-amber-900 selection:bg-amber-200 selection:text-[#8b0000]">
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
    </div>
  );
}
