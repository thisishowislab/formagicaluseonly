import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DustParticles from './DustParticles';

interface ThresholdProps {
  onComplete: () => void;
}

const Threshold = ({ onComplete }: ThresholdProps) => {
  const [phase, setPhase] = useState(0);

  // Check if user has seen the intro before
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenThreshold');
    if (hasSeenIntro) {
      onComplete();
    }
  }, [onComplete]);

  // Phase progression with more dramatic timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),      // First text fades in
      setTimeout(() => setPhase(2), 3500),     // Title reveal
      setTimeout(() => setPhase(3), 6500),     // Tagline + button
      setTimeout(() => setPhase(4), 15000),    // Auto-complete fallback
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 4) {
      handleEnter();
    }
  }, [phase]);

  const handleEnter = () => {
    sessionStorage.setItem('hasSeenThreshold', 'true');
    onComplete();
  };

  const handleSkip = () => {
    sessionStorage.setItem('hasSeenThreshold', 'true');
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-50 bg-background overflow-hidden"
    >
      {/* Layered animated background */}
      <div className="absolute inset-0">
        {/* Base gradient that shifts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 100%, hsl(var(--primary)/0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, hsl(var(--background)) 0%, hsl(var(--background)) 100%)',
          }}
        />
        
        {/* Animated aurora-like effect */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.5, 0.3],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 180deg at 50% 120%, transparent 0deg, hsl(var(--accent)/0.08) 60deg, transparent 120deg, hsl(var(--primary)/0.12) 180deg, transparent 240deg, hsl(var(--accent)/0.06) 300deg, transparent 360deg)',
            filter: 'blur(40px)',
          }}
        />

        {/* Central pulsing glow - UV reactive feel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
            scale: [0.8, 1.2, 1, 1.3, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent)/0.5) 0%, hsl(var(--primary)/0.3) 30%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Secondary accent glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            x: ['-10%', '10%', '-10%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)/0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Enhanced dust particles */}
      <DustParticles count={60} />

      {/* Animated horizon line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.8 }}
        transition={{ duration: 3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[55%] left-[10%] right-[10%] h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--accent)/0.6) 20%, hsl(var(--primary)) 50%, hsl(var(--accent)/0.6) 80%, transparent 100%)',
          boxShadow: '0 0 20px hsl(var(--primary)/0.5), 0 0 40px hsl(var(--accent)/0.3)',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {phase >= 1 && phase < 2 && (
            <motion.p
              key="phase1"
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-4xl lg:text-5xl text-foreground font-body italic tracking-wide text-center"
            >
              Somewhere in the desert...
            </motion.p>
          )}

          {phase >= 2 && phase < 3 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Decorative line above */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] w-32 md:w-48 mx-auto mb-8 bg-gradient-to-r from-transparent via-accent to-transparent"
              />
              
              <motion.h1
                initial={{ opacity: 0, y: 30, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-7xl lg:text-8xl font-display font-medium text-foreground mb-6"
                style={{
                  textShadow: '0 0 60px hsl(var(--primary)/0.6), 0 0 120px hsl(var(--accent)/0.4), 0 4px 30px hsl(var(--background)/0.8)',
                }}
              >
                THE MANIFESTORIUM
              </motion.h1>
              
              {/* Decorative line below */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] w-48 md:w-72 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{
                  boxShadow: '0 0 20px hsl(var(--primary)/0.5)',
                }}
              />
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              {/* Decorative line above */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] w-32 md:w-48 mx-auto mb-8 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              />
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl md:text-6xl lg:text-7xl font-display font-medium tracking-[0.15em] text-foreground mb-8"
                style={{
                  textShadow: '0 0 60px hsl(var(--primary)/0.6), 0 0 120px hsl(var(--accent)/0.4)',
                }}
              >
                THE MANIFESTORIUM
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-lg md:text-2xl text-muted-foreground font-body italic mb-12 max-w-lg mx-auto"
              >
                A quiet kind of magic awaits
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px hsl(var(--accent)/0.6), 0 0 80px hsl(var(--primary)/0.4)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                onClick={handleEnter}
                className="relative px-14 py-5 text-lg md:text-xl font-display tracking-[0.3em] uppercase text-foreground border-2 border-accent/60 bg-accent/10 backdrop-blur-md hover:bg-accent/20 hover:border-accent transition-all duration-500 overflow-hidden group"
              >
                {/* Button glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">Enter</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        onClick={handleSkip}
        className="fixed bottom-8 right-8 text-sm tracking-[0.25em] uppercase text-muted-foreground font-body hover:text-foreground transition-colors duration-300 z-20"
      >
        Skip
      </motion.button>

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)/0.4) 70%, hsl(var(--background)) 100%)',
        }}
      />
    </motion.div>
  );
};

export default Threshold;
