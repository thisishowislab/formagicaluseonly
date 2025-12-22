import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DustParticles from './DustParticles';

interface ThresholdProps {
  onComplete: () => void;
}

const Threshold = ({ onComplete }: ThresholdProps) => {
  const [phase, setPhase] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Check if user has seen the intro before
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenThreshold');
    if (hasSeenIntro) {
      onComplete();
    }
  }, [onComplete]);

  // Phase progression with cinematic timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 6000),
      setTimeout(() => setPhase(4), 9000),
      setTimeout(() => setPhase(5), 20000), // Auto-complete fallback
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 5) {
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
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ backgroundColor: 'hsl(25 20% 4%)' }}
    >
      {/* CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.4) contrast(1.2) saturate(1.3)',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 2s ease-in-out'
          }}
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-at-a-campfire-39763-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Fallback gradient if video doesn't load */}
        <div 
          className="absolute inset-0"
          style={{
            opacity: videoLoaded ? 0 : 1,
            transition: 'opacity 2s ease-in-out',
            background: 'radial-gradient(ellipse at 50% 100%, hsl(15 40% 15%) 0%, hsl(25 20% 4%) 70%)'
          }}
        />
      </div>

      {/* MULTI-COLOR ANIMATED OVERLAYS */}
      
      {/* Magenta/Purple glow - bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
          scale: [1, 1.2, 1.1, 1.3, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] md:w-[900px] md:h-[900px]"
        style={{
          background: 'radial-gradient(circle, hsl(300 80% 50% / 0.5) 0%, hsl(280 70% 40% / 0.3) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Cyan/Teal glow - top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
          scale: [1, 1.15, 1.05, 1.2, 1],
          x: ['0%', '5%', '-3%', '5%', '0%']
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] md:w-[800px] md:h-[800px]"
        style={{
          background: 'radial-gradient(circle, hsl(185 90% 55% / 0.5) 0%, hsl(200 80% 45% / 0.3) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Golden/Amber glow - center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.1, 0.4, 0.2, 0.5, 0.1],
          scale: [0.8, 1.3, 1, 1.4, 0.8]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px]"
        style={{
          background: 'radial-gradient(circle, hsl(45 90% 55% / 0.4) 0%, hsl(35 80% 45% / 0.2) 40%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Electric blue accent - floating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.15, 0.35, 0.2, 0.4, 0.15],
          y: ['-5%', '5%', '-3%', '8%', '-5%'],
          x: ['-10%', '10%', '-5%', '15%', '-10%']
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        style={{
          background: 'radial-gradient(circle, hsl(220 90% 60% / 0.4) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Rose/Pink accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.15, 0.35, 0.1],
          scale: [1, 1.2, 0.9, 1.3, 1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] md:w-[550px] md:h-[550px]"
        style={{
          background: 'radial-gradient(circle, hsl(340 80% 55% / 0.35) 0%, transparent 60%)',
          filter: 'blur(55px)',
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
      <DustParticles count={80} />

      {/* ANIMATED HORIZON GLOW */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[20%] left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(185 90% 55% / 0.3) 15%, hsl(280 70% 60% / 0.8) 35%, hsl(45 90% 60% / 1) 50%, hsl(280 70% 60% / 0.8) 65%, hsl(185 90% 55% / 0.3) 85%, transparent 100%)',
          boxShadow: '0 0 30px hsl(280 70% 60% / 0.6), 0 0 60px hsl(45 90% 60% / 0.4), 0 0 100px hsl(185 90% 55% / 0.3)',
        }}
      />

      {/* Secondary horizon glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.4, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] left-[10%] right-[10%] h-[80px]"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, hsl(280 70% 50% / 0.4) 0%, hsl(45 80% 50% / 0.2) 40%, transparent 100%)',
          filter: 'blur(30px)',
        }}
      />

      {/* CINEMATIC CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {phase >= 1 && phase < 2 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-3xl lg:text-4xl font-body italic tracking-widest"
                style={{
                  color: 'hsl(35 40% 80%)',
                  textShadow: '0 0 30px hsl(45 80% 60% / 0.5), 0 0 60px hsl(280 70% 50% / 0.3)',
                }}
              >
                Somewhere in the desert...
              </motion.p>
            </motion.div>
          )}

          {phase >= 2 && phase < 3 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-2xl lg:text-3xl font-body italic tracking-wide"
                style={{
                  color: 'hsl(185 70% 70%)',
                  textShadow: '0 0 25px hsl(185 80% 50% / 0.6)',
                }}
              >
                ...beyond the edge of everything known...
              </motion.p>
            </motion.div>
          )}

          {phase >= 3 && phase < 4 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-2xl lg:text-3xl font-body italic tracking-wide"
                style={{
                  color: 'hsl(300 60% 75%)',
                  textShadow: '0 0 25px hsl(280 70% 60% / 0.6)',
                }}
              >
                ...a quiet kind of magic awaits.
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
                Where forgotten things find their voice
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
