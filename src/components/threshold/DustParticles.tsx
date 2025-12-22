import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface DustParticlesProps {
  count?: number;
}

const DustParticles = ({ count = 80 }: DustParticlesProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const isGlowing = Math.random() > 0.5;
      const colorVariant = Math.random();
      
      // Multi-color particles
      let color;
      if (colorVariant < 0.25) {
        color = 'hsl(45 80% 70%)'; // Gold
      } else if (colorVariant < 0.45) {
        color = 'hsl(280 70% 65%)'; // Magenta
      } else if (colorVariant < 0.65) {
        color = 'hsl(185 80% 60%)'; // Cyan
      } else if (colorVariant < 0.8) {
        color = 'hsl(340 70% 65%)'; // Rose
      } else {
        color = 'hsl(35 50% 75%)'; // Warm white
      }

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: isGlowing ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
        opacity: isGlowing ? Math.random() * 0.8 + 0.4 : Math.random() * 0.4 + 0.1,
        isGlowing,
        color,
        xDrift: (Math.random() - 0.5) * 200,
        yDrift: (Math.random() - 0.5) * 150,
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity * 0.5, particle.opacity, 0],
            scale: [0, 1, 1.2, 0.8, 0],
            x: [0, particle.xDrift * 0.3, particle.xDrift * 0.7, particle.xDrift],
            y: [0, particle.yDrift * 0.3, particle.yDrift * 0.7, particle.yDrift],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: particle.isGlowing 
              ? `0 0 ${particle.size * 4}px ${particle.color}, 0 0 ${particle.size * 8}px ${particle.color}`
              : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default DustParticles;