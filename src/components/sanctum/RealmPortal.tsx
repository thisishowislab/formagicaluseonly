import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Realm {
  id: string;
  name: string;
  description: string;
  available: boolean;
  color: string;
  href?: string;
}

interface RealmPortalProps {
  realm: Realm;
  index: number;
}

const RealmPortal = ({ realm, index }: RealmPortalProps) => {
  const isManifestorium = realm.id === 'manifestorium';

  const portalContent = (
    <div
      className={`
        relative overflow-hidden border transition-all duration-500
        ${realm.available 
          ? 'border-primary/30 hover:border-primary/60 cursor-pointer' 
          : 'border-border/20 cursor-not-allowed opacity-60'
        }
        ${isManifestorium ? 'p-12' : 'p-8'}
      `}
    >
      {/* Portal glow effect */}
      {realm.available && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, hsl(var(--${realm.color}) / 0.15) 0%, transparent 70%)`
          }}
        />
      )}

      {/* Breathing animation for active portals */}
      {realm.available && (
        <div 
          className="absolute top-4 right-4 w-2 h-2 rounded-full animate-glow-pulse"
          style={{ backgroundColor: `hsl(var(--${realm.color}))` }}
        />
      )}

      {/* Lock for unavailable realms */}
      {!realm.available && (
        <div className="absolute top-4 right-4 text-muted-foreground/40">
          <Lock size={16} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <h2 
          className={`
            font-display tracking-wider mb-3 transition-all duration-300
            ${isManifestorium 
              ? 'text-2xl md:text-3xl text-glow-primary' 
              : 'text-lg md:text-xl'
            }
            ${realm.available 
              ? 'text-foreground group-hover:text-primary' 
              : 'text-muted-foreground'
            }
          `}
        >
          {realm.name}
        </h2>
        
        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
          {realm.description}
        </p>

        {isManifestorium && (
          <div className="mt-6 space-y-3">
            <p className="text-muted-foreground/80 font-body text-sm leading-relaxed">
              UV reactive art • 3D printed artifacts • Immersive atmospheres
            </p>
            <div className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-primary/80">
              <span className="w-4 h-px bg-primary/40" />
              <span>Explore the artifacts</span>
              <span className="w-4 h-px bg-primary/40" />
            </div>
          </div>
        )}
      </div>

      {/* Hover line effect */}
      {realm.available && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      className={`group relative ${isManifestorium ? 'md:col-span-2' : ''}`}
    >
      {realm.available && realm.href ? (
        <Link to={realm.href}>
          {portalContent}
        </Link>
      ) : (
        portalContent
      )}
    </motion.div>
  );
};

export default RealmPortal;
