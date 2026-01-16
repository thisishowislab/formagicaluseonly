import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DustParticles from './DustParticles';
import { useAmbientAudio } from '@/hooks/useAmbientAudio';

interface ThresholdProps {
  onComplete: () => void;
}

const Threshold = ({ onComplete }: ThresholdProps) => {
  const [phase, setPhase] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);
  const ambientAudio = useAmbientAudio({ fadeInDuration: 4000, fadeOutDuration: 2000, volume: 0.12 });
  const introLines = useMemo(
    () => [
      {
        id: 1,
        text: 'You have arrived at the threshold...',
        className: 'text-xl md:text-3xl lg:text-4xl font-body italic tracking-widest',
        color: 'hsl(35 50% 82%)',
        shadow:
          '0 0 32px hsl(45 80% 60% / 0.5), 0 0 64px hsl(280 70% 50% / 0.3)',
        duration: 3200,
      },
      {
        id: 2,
        text: 'Where forgotten sparks gather and glow...',
        className: 'text-lg md:text-2xl lg:text-3xl font-body italic tracking-wide',
        color: 'hsl(185 70% 72%)',
        shadow: '0 0 28px hsl(185 80% 55% / 0.6)',
        duration: 3200,
      },
      {
        id: 3,
        text: 'A place for the curious, the bold, the becoming.',
        className: 'text-lg md:text-2xl lg:text-3xl font-body italic tracking-wide',
        color: 'hsl(300 60% 77%)',
        shadow: '0 0 28px hsl(280 70% 60% / 0.6)',
        duration: 3500,
      },
    ],
    [],
  );
  const currentIntroLine = introLines.find((line) => line.id === phase);

  // Check if user has seen the intro before
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenThreshold');
    if (hasSeenIntro) {
      onComplete();
    }
  }, [onComplete]);

  // Start ambient audio on first user interaction (required for autoplay policy)
  useEffect(() => {
    const startAudioOnInteraction = () => {
      if (!audioStarted) {
        ambientAudio.start();
        setAudioStarted(true);
      }
    };

    // Try to start immediately (works if user already interacted with page)
    const timer = setTimeout(() => {
      startAudioOnInteraction();
    }, 500);

    // Also listen for user interaction as fallback
    window.addEventListener('click', startAudioOnInteraction, { once: true });
    window.addEventListener('keydown', startAudioOnInteraction, { once: true });
    window.addEventListener('touchstart', startAudioOnInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('keydown', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
    };
  }, [ambientAudio, audioStarted]);

  // Phase progression with cinematic timing
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 500;

    introLines.forEach((line, index) => {
      timers.push(
        setTimeout(() => setPhase(line.id), elapsed),
      );
      elapsed += line.duration + (index === introLines.length - 1 ? 900 : 700);
    });

    timers.push(setTimeout(() => setPhase(4), elapsed));
    timers.push(setTimeout(() => setPhase(5), elapsed + 8500));

    return () => timers.forEach(clearTimeout);
  }, [introLines]);

  useEffect(() => {
    if (phase === 5) {
      handleEnter();
    }
  }, [phase]);

  const handleEnter = () => {
    ambientAudio.stop();
    sessionStorage.setItem('hasSeenThreshold', 'true');
    onComplete();
  };

  const handleSkip = () => {
    ambientAudio.stop();
    sessionStorage.setItem('hasSeenThreshold', 'true');
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ backgroundColor: 'hsl(25 20% 4%)' }}
    >
      {/* CINEMATIC BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(120deg, hsl(270 30% 10%) 0%, hsl(235 25% 12%) 45%, hsl(200 25% 12%) 65%, hsl(28 25% 12%) 100%)',
        }}
      />

      {/* Subtle color veil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.45, 0.35, 0.5, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 15% 70%, hsl(280 35% 25% / 0.5) 0%, transparent 55%), radial-gradient(120% 120% at 85% 20%, hsl(190 35% 25% / 0.5) 0%, transparent 50%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Horizon haze */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.25, 0.15, 0.3, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[22%] left-0 right-0 h-[220px]"
        style={{
          background:
            'radial-gradient(ellipse 120% 100% at 50% 100%, hsl(300 30% 35% / 0.35) 0%, hsl(40 30% 30% / 0.2) 35%, transparent 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* ANIMATED LIGHT RAYS */}
      <motion.div
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ 
          opacity: [0, 0.15, 0.08, 0.2, 0],
          rotate: [-15, -10, -20, -5, -15]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[200px] h-full origin-top"
        style={{
          background: 'linear-gradient(180deg, hsl(45 80% 70% / 0.3) 0%, transparent 60%)',
          filter: 'blur(20px)',
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ 
          opacity: [0, 0.12, 0.05, 0.18, 0],
          rotate: [10, 15, 5, 20, 10]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-0 right-1/3 w-[150px] h-full origin-top"
        style={{
          background: 'linear-gradient(180deg, hsl(185 80% 60% / 0.25) 0%, transparent 50%)',
          filter: 'blur(15px)',
        }}
      />

      {/* Enhanced dust particles */}
      <DustParticles count={140} variant="intro" />

      {/* ANIMATED HORIZON GLOW */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[18%] left-0 right-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, hsl(200 50% 60% / 0.3) 20%, hsl(300 45% 60% / 0.6) 45%, hsl(40 45% 65% / 0.8) 50%, hsl(300 45% 60% / 0.6) 55%, hsl(200 50% 60% / 0.3) 80%, transparent 100%)',
          boxShadow:
            '0 0 25px hsl(300 45% 60% / 0.4), 0 0 50px hsl(40 45% 65% / 0.35)',
        }}
      />

      {/* CINEMATIC CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {currentIntroLine && (
            <motion.div
              key={`phase-${currentIntroLine.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 50, filter: 'blur(18px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className={currentIntroLine.className}
                style={{
                  color: currentIntroLine.color,
                  textShadow: currentIntroLine.shadow,
                }}
              >
                {currentIntroLine.text}
              </motion.p>
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div
              key="phase4-final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              {/* Decorative top element */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mb-8 h-[2px] w-24 md:w-40"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(185 90% 55%), hsl(280 70% 60%), hsl(45 90% 60%), hsl(280 70% 60%), hsl(185 90% 55%), transparent)',
                }}
              />

              {/* THE MANIFESTORIUM - Epic title */}
              <motion.h1
                initial={{ opacity: 0, y: 50, letterSpacing: '0.8em', scale: 0.8 }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.25em', scale: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-6xl lg:text-8xl font-display font-semibold mb-6"
                style={{
                  background: 'linear-gradient(135deg, hsl(45 90% 70%) 0%, hsl(35 80% 80%) 20%, hsl(280 70% 75%) 40%, hsl(185 80% 70%) 60%, hsl(300 60% 75%) 80%, hsl(45 90% 70%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px hsl(280 70% 60% / 0.6)) drop-shadow(0 0 80px hsl(45 90% 60% / 0.4))',
                }}
              >
                THE MANIFESTORIUM
              </motion.h1>

              {/* Decorative bottom element */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mb-10 h-[3px] w-36 md:w-64"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(280 70% 60%), hsl(45 90% 60%), hsl(280 70% 60%), transparent)',
                  boxShadow: '0 0 20px hsl(280 70% 60% / 0.5), 0 0 40px hsl(45 90% 60% / 0.3)',
                }}
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-base md:text-xl lg:text-2xl font-body italic mb-12 tracking-wide"
                style={{
                  color: 'hsl(35 30% 75%)',
                  textShadow: '0 0 20px hsl(45 80% 60% / 0.3)',
                }}
              >
                A cinematic welcome for the seekers and the bold
              </motion.p>

              {/* ENTER button - Epic with multi-color border */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.08,
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                onClick={handleEnter}
                className="relative px-12 py-5 md:px-16 md:py-6 text-base md:text-lg font-display tracking-[0.4em] uppercase overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, hsl(280 40% 15% / 0.8), hsl(25 20% 10% / 0.9))',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                  color: 'hsl(35 40% 85%)',
                }}
              >
                {/* Animated gradient border */}
                <span 
                  className="absolute inset-0 -z-10"
                  style={{
                    background: 'linear-gradient(135deg, hsl(185 90% 55%), hsl(280 70% 60%), hsl(45 90% 60%), hsl(340 80% 55%), hsl(185 90% 55%))',
                    backgroundSize: '300% 300%',
                    animation: 'gradient-shift 4s ease infinite',
                    margin: '-2px',
                    borderRadius: '4px',
                  }}
                />
                
                {/* Inner background */}
                <span 
                  className="absolute inset-[2px] -z-10 transition-all duration-500 group-hover:inset-[3px]"
                  style={{
                    background: 'linear-gradient(135deg, hsl(280 40% 12%), hsl(25 20% 8%))',
                    borderRadius: '2px',
                  }}
                />

                {/* Hover glow sweep */}
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                
                <span className="relative z-10">Enter</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 1, color: 'hsl(185 80% 70%)' }}
        transition={{ duration: 0.5, delay: 1.5 }}
        onClick={handleSkip}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 text-xs md:text-sm tracking-[0.3em] uppercase font-body transition-all duration-300 z-20"
        style={{ color: 'hsl(35 20% 50%)' }}
      >
        Skip Intro
      </motion.button>

      {/* Cinematic letterbox bars */}
      <motion.div
        initial={{ height: '0%' }}
        animate={{ height: '8%' }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 z-20"
        style={{ background: 'hsl(25 20% 2%)' }}
      />
      <motion.div
        initial={{ height: '0%' }}
        animate={{ height: '8%' }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ background: 'hsl(25 20% 2%)' }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, hsl(25 20% 4% / 0.5) 60%, hsl(25 20% 2%) 100%)',
        }}
      />

      {/* Keyframe animation for gradient border */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default Threshold;
