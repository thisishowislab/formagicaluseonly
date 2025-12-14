import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DustParticles from './DustParticles';

interface ThresholdProps {
  onComplete: () => void;
}

const Threshold = ({ onComplete }: ThresholdProps) => {
  const [phase, setPhase] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check if user has seen intro before
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('threshold-seen');
    if (hasSeen) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (hasInteracted) return;

    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => {
        sessionStorage.setItem('threshold-seen', 'true');
        onComplete();
      }, 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [hasInteracted, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('threshold-seen', 'true');
    onComplete();
  };

  const handleEnter = () => {
    setHasInteracted(true);
    sessionStorage.setItem('threshold-seen', 'true');
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
    >
      {/* Dust particles */}
      <DustParticles />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <AnimatePresence mode="wait">
          {phase >= 1 && (
            <motion.p
              key="whisper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8 font-body"
            >
              Somewhere in the desert...
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase >= 2 && (
            <motion.h1
              key="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-4xl md:text-6xl font-display font-medium tracking-wider text-foreground mb-6 text-glow-primary"
            >
              The Manifestorium
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase >= 3 && (
            <motion.div
              key="enter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <p className="text-lg md:text-xl text-muted-foreground font-body italic leading-relaxed">
                A quiet kind of magic awaits
              </p>
              
              <button
                onClick={handleEnter}
                className="group relative px-8 py-3 font-display text-sm tracking-[0.2em] uppercase text-foreground border border-primary/30 hover:border-primary/60 transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">Enter</span>
                <div className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-xs tracking-[0.2em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 font-body"
      >
        Skip
      </button>

      {/* Subtle border glow */}
      <div className="absolute inset-0 pointer-events-none border border-primary/5" />
    </motion.div>
  );
};

export default Threshold;
