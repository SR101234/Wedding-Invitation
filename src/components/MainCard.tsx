import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

const Mandala = ({ className }: { className: string }) => (
  <motion.img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mandala_1.svg/512px-Mandala_1.svg.png" 
    className={`absolute opacity-15 pointer-events-none mix-blend-multiply ${className}`}
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    style={{ filter: 'invert(30%) sepia(80%) saturate(400%) hue-rotate(350deg)' }}
    alt=""
  />
);

export default function MainCard({ onFinish }: { onFinish: () => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = () => {
    isPausedRef.current = true; 
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isFinished = false; 
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // DELTA TIME FIX: Instead of pixels per frame, we use pixels per millisecond
    // 0.11 px/ms is roughly equivalent to 1.8px per frame at 60fps.
    const speedPerMs = isMobile ? 0.11 : 0.07; 

    const startScrolling = () => {
      let lastTime = performance.now();
      let preciseScrollTop = container.scrollTop; // Track exact decimal position

      const scroll = (currentTime: number) => {
        if (!container || isFinished) return;

        // Calculate exactly how much time has passed since the last frame
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        if (!isPausedRef.current) {
          // Multiply time passed by speed. If a frame drops, deltaTime is larger, 
          // meaning it moves exactly the right amount to prevent a visual stutter.
          preciseScrollTop += deltaTime * speedPerMs;
          container.scrollTop = preciseScrollTop;

          if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
            isFinished = true;
            setTimeout(() => {
              onFinish();
            }, 1000); 
            return; 
          }
        }

        animationFrameId = requestAnimationFrame(scroll);
      };

      animationFrameId = requestAnimationFrame(scroll);
    };

    const initialDelay = setTimeout(() => {
      startScrolling();
    }, 2000);

    return () => {
      clearTimeout(initialDelay);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [onFinish]);

  return (
    <motion.div
      ref={scrollContainerRef}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
      onMouseDown={handleInteraction}
      onWheel={handleInteraction}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-[#fdfbf7] z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="fixed inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none z-0"></div>
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Mandala className="-top-32 -left-32 w-96 h-96" />
        <Mandala className="-bottom-32 -right-32 w-96 h-96" />
        <Mandala className="top-1/2 -right-48 w-80 h-80 -translate-y-1/2" />
        <Mandala className="top-1/2 -left-48 w-80 h-80 -translate-y-1/2" />
      </div>

      <div className="relative w-full min-h-screen">
        
        <div className="absolute top-4 bottom-4 left-4 right-4 md:top-6 md:bottom-6 md:left-6 md:right-6 border-[3px] border-amber-600/40 rounded-2xl pointer-events-none z-10 shadow-[inset_0_0_20px_rgba(217,119,6,0.2)]"></div>
        <div className="absolute top-6 bottom-6 left-6 right-6 md:top-8 md:bottom-8 md:left-8 md:right-8 border border-amber-500/30 rounded-xl pointer-events-none z-10"></div>

        <div className="max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center space-y-32 md:space-y-40 relative z-20">
          
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="w-full"
          >
            <div className="text-amber-800 mb-16 font-['Tiro_Devanagari_Hindi'] text-xl md:text-3xl max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              परम स्वजन, परमपिता परमात्मा की असीम अनुकम्पा एवं पूर्वजो के आशीर्वाद से
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#b30000] via-[#8b0000] to-[#4a0000] font-['Tiro_Devanagari_Hindi'] drop-shadow-xl filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] pt-9 w-150">सौ. कां. महिमा</h2>
                <p className="mt-8 text-lg md:text-xl text-amber-900 font-['Tiro_Devanagari_Hindi'] max-w-[300px] font-medium">
                  सुपुत्री श्रीमती राजरानी अग्रवाल एवं स्व. श्री रमेश चन्द अग्रवाल
                </p>
                <p className="mt-8 text-lg md:text-xl text-amber-900 font-['Tiro_Devanagari_Hindi'] max-w-[300px] font-medium">
                सुपुत्री श्रीमती गीता अग्रवाल एवं स्व. श्री दाऊदयाल अग्रवाल
                </p>
                <p className="mt-8 text-lg md:text-xl text-amber-900 font-['Tiro_Devanagari_Hindi'] max-w-[300px] font-medium">
                निवासी ट्रान्स यमुना कॉलोनी, आगरा-6
                </p>
              </motion.div>
              
              <div className="flex flex-col items-center justify-center relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-4 border-dashed border-amber-500 rounded-full flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-yellow-500 rounded-full shadow-inner"></div>
                </motion.div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-[#8b0000] font-['Great_Vibes'] drop-shadow-md z-10">Weds</div>
              </div>

              <motion.div 
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#b30000] via-[#8b0000] to-[#4a0000] font-['Tiro_Devanagari_Hindi'] drop-shadow-xl filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] pt-9 w-150">चि. अर्पित</h2>
                <span className="text-4xl md:text-5xl text-[#8b0000] font-['Tiro_Devanagari_Hindi'] mt-2 font-semibold">(चिराग)</span>
                <p className="mt-8 text-lg md:text-xl text-amber-900 font-['Tiro_Devanagari_Hindi'] max-w-[300px] font-medium">
                  सुपुत्र स्व. श्रीमती विमला देवी एवं स्व. श्री स्मेश चन्द अग्रवाल
                </p>
                <p className="mt-8 text-lg md:text-xl text-amber-900 font-['Tiro_Devanagari_Hindi'] max-w-[300px] font-medium">
                  सुपुत्र श्रीमती रेनू एवं श्री रामप्रकाश अग्रवाल
                </p>
                <p className="mt-8 text-lg md:text-xl text-amber-900 font-['Tiro_Devanagari_Hindi'] max-w-[300px] font-medium">
                  निवासी आगरा
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            // PERFORMANCE FIX: backdrop-blur-none on mobile, backdrop-blur-md on desktop. bg-white/95 ensures it still looks great without blur.
            className="w-full max-w-5xl bg-white/95 md:bg-white/90 backdrop-blur-none md:backdrop-blur-md p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(139,0,0,0.15)] border-[3px] border-amber-300 relative mx-auto"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8b0000] via-[#a50000] to-[#8b0000] text-amber-100 px-12 py-4 rounded-full text-4xl md:text-5xl font-['Tiro_Devanagari_Hindi'] shadow-[0_10px_20px_rgba(139,0,0,0.4)] border-2 border-amber-400 whitespace-nowrap">
              मांगलिक कार्यक्रम
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 mt-16 font-['Tiro_Devanagari_Hindi']">
              <div className="space-y-8 bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-200 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-bl-full opacity-20"></div>
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900 border-b-2 border-amber-400 pb-4 inline-block relative z-10 pt-1">गुरुवार, 7 मई 2026</h3>
                <div className="space-y-6 mt-8 relative z-10">
                  <div className="flex justify-between items-center text-2xl border-b border-amber-200/50 pb-4">
                    <span className="text-amber-900">प्रातः 11.00 बजे</span>
                    <span className="font-bold text-[#8b0000] text-3xl">शुभ लगन</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl">
                    <span className="text-amber-900 w-50">साय 8.00 बजे</span>
                    <span className="font-bold text-[#8b0000] text-2xl ml-10">स्वागत बारात एवं प्रीतिभोज</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8 bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl border border-amber-200 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-bl-full opacity-20"></div>
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900 border-b-2 border-amber-400 pb-4 inline-block relative z-10 pt-1">शुक्रवार, 8 मई 2026</h3>
                <div className="space-y-6 mt-8 relative z-10">
                  <div className="flex justify-between items-center text-2xl">
                    <span className="text-amber-900">प्रातः बेला</span>
                    <span className="font-bold text-[#8b0000] text-3xl">मीगी पलकें</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full text-center font-['Tiro_Devanagari_Hindi'] relative"
          >
            <div className="inline-block mb-12">
              <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 mb-4 drop-shadow-md pt-3">॥ विवाह स्थल ॥</h3>
              <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
            </div>
            
            {/* PERFORMANCE FIX: Removed blur on mobile here as well */}
            <div className="bg-white/95 md:bg-white/80 backdrop-blur-none md:backdrop-blur-md p-12 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-amber-300 max-w-3xl mx-auto relative overflow-hidden">
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              
              <p className="text-5xl text-[#8b0000] font-bold mb-6 relative z-10 drop-shadow-sm">महाराजा अग्रसेन सेवा सदन</p>
              <p className="text-3xl text-amber-800 relative z-10 font-medium">मुगल रोड, कमला नगर, आगरा</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            // PERFORMANCE FIX: Removed blur on mobile here as well
            className="w-full font-['Tiro_Devanagari_Hindi'] relative bg-white/95 md:bg-white/60 backdrop-blur-none md:backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-amber-200 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 text-center">
              
              <div className="flex flex-col space-y-3">
                <h4 className="text-2xl md:text-3xl font-bold text-[#8b0000] mb-3">दर्शनाभिलाषी :</h4>
                <p className="text-lg md:text-xl text-amber-900 font-medium">रजत अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">अनुज अग्रवाल-रवीना अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">कार्तिक अग्रवाल, गणेश अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">शिवम अग्रवाल, शरद अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">हनी अग्रवाल, शिवा अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-bold mt-2">एवं समस्त अग्रवाल परिवार</p>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="text-2xl md:text-3xl font-bold text-[#8b0000] mb-3">स्वागतोत्सुक :</h4>
                <p className="text-lg md:text-xl text-amber-900 font-medium">कुसुम अग्रवाल-ललित अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">श्रीमती अल्का अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">नेहा अग्रवाल-राजेश अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">कृति अग्रवाल, छवि अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">वैष्णवी अग्रवाल, कृतिमा अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">दिवांशी अग्रवाल, अंकिता अग्रवाल</p>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="text-2xl md:text-3xl font-bold text-[#8b0000] mb-3">ननिहाल पक्ष :</h4>
                <p className="text-lg md:text-xl text-amber-900 font-medium">(मामा-मामी)</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">नरेन्द्र अग्रवाल-रेखा अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">नीरज-पूनम</p>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="text-2xl md:text-3xl font-bold text-[#8b0000] mb-3">विनीत :</h4>
                <p className="text-lg md:text-xl text-amber-900 font-medium">लक्ष्मण प्रसाद अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">संजीव अग्रवाल-मिनिषा अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">मनीष अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">अमित अग्रवाल-चंचल अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">मनोज अग्रवाल-सरिता अग्रवाल</p>
                <p className="text-lg md:text-xl text-amber-900 font-medium">सुधीर अग्रवाल</p>
              </div>

            </div>
          </motion.section>

        </div>
      </div>
    </motion.div>
  );
}