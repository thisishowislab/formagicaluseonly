import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface DustParticlesProps {
  count?: number;
}

const DustParticles = ({ count = 50 }: DustParticlesProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.6 + 0.2,
      isGlowing: Math.random() > 0.6, // 40% of particles glow
      glowColor: Math.random() > 0.5 ? 'accent' : 'primary',
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y + 20}vh`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [
              `${particle.x}vw`, 
              `${particle.x + (Math.random() - 0.5) * 15}vw`,
              `${particle.x + (Math.random() - 0.5) * 10}vw`
            ],
            y: [
              `${particle.y + 20}vh`, 
              `${particle.y}vh`,
              `${particle.y - 25}vh`
            ],
            opacity: [0, particle.opacity, particle.opacity * 0.8, 0],
            scale: [0, 1, 1.2, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: particle.isGlowing 
              ? `hsl(var(--${particle.glowColor}))` 
              : 'hsl(var(--foreground)/0.5)',
            boxShadow: particle.isGlowing 
              ? `0 0 ${particle.size * 3}px hsl(var(--${particle.glowColor})), 0 0 ${particle.size * 6}px hsl(var(--${particle.glowColor})/0.5)` 
              : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default DustParticles;
