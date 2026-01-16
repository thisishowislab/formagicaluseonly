import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplets, TreeDeciduous, Home, Fish, Sun, Wind, Leaf, Sprout } from 'lucide-react';
const features = [{
  icon: Droplets,
  title: 'Circular Water System',
  description: 'A giant reclaimed water tank becomes the heart of the system—water flows, filters, and returns in an endless cycle.'
}, {
  icon: Fish,
  title: 'Aquaponics Integration',
  description: 'Fish waste feeds the plants, plants clean the water for the fish. Nature\'s perfect closed loop, scaled for desert living.'
}, {
  icon: TreeDeciduous,
  title: 'Living Canopy',
  description: 'Fruit trees, climbing vines, and vertical gardens create shade and food production in the harsh desert climate.'
}, {
  icon: Home,
  title: 'Treehouse Sanctuary',
  description: 'Rising from the center—a handbuilt treehouse for rest, creativity, and watching the garden grow.'
}];
const phases = [{
  phase: 'Phase 1',
  title: 'The Foundation',
  description: 'Water tank acquisition, base structure, initial plumbing systems',
  status: 'in-progress'
}, {
  phase: 'Phase 2',
  title: 'Living Systems',
  description: 'Fish introduction, grow beds installation, water cycling tests',
  status: 'planned'
}, {
  phase: 'Phase 3',
  title: 'Vertical Growth',
  description: 'Climbing structures, tree planting, shade canopy development',
  status: 'planned'
}, {
  phase: 'Phase 4',
  title: 'The Treehouse',
  description: 'Platform construction, walls, roof, and the finishing touches',
  status: 'future'
}];
const TheLivingGrove = () => {
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background - green/aqua tones */}
      <div className="fixed inset-0 opacity-40" style={{
      background: 'radial-gradient(ellipse at 30% 20%, hsl(160 50% 30% / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(185 60% 35% / 0.25) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, hsl(100 40% 25% / 0.2) 0%, transparent 60%)'
    }} />

      {/* Floating particles - like water droplets/leaves */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute rounded-full" style={{
        width: Math.random() * 6 + 2,
        height: Math.random() * 6 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        background: i % 2 === 0 ? 'hsl(185 80% 60% / 0.4)' : 'hsl(120 60% 50% / 0.3)'
      }} animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.7, 0.3]
      }} transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 3
      }} />)}
      </div>

      {/* Back navigation */}
      <Link to="/" className="fixed top-6 left-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-body tracking-wide">Return to The Manifestorium </span>
      </Link>

      <main className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.header initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{
            background: 'linear-gradient(135deg, hsl(160 60% 35%), hsl(185 70% 40%))',
            boxShadow: '0 0 40px hsl(160 60% 40% / 0.4)'
          }}>
              <Sprout className="w-10 h-10 text-white" />
            </motion.div>
            
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
              A Realm of Water & Growth
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-wider mb-6" style={{
            background: 'linear-gradient(135deg, hsl(160 70% 50%) 0%, hsl(185 80% 55%) 50%, hsl(120 60% 45%) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px hsl(160 70% 50% / 0.4))'
          }}>
              The Living Grove
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body italic max-w-2xl mx-auto leading-relaxed">
              Where a giant water tank becomes a circular aquaponics garden, 
              and a treehouse rises from the center of it all.
            </p>
          </motion.header>

          {/* Vision Statement */}
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="mb-20">
            <div className="relative p-8 md:p-12 rounded-2xl border border-border/50 backdrop-blur-sm" style={{
            background: 'linear-gradient(135deg, hsl(160 30% 15% / 0.5), hsl(185 25% 12% / 0.6))'
          }}>
              <div className="absolute top-4 right-4 flex gap-2">
                <Sun className="w-5 h-5 text-yellow-400/60" />
                <Wind className="w-5 h-5 text-cyan-400/60" />
                <Leaf className="w-5 h-5 text-green-400/60" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-6">
                The Vision
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-lg">
                <p>
                  In the middle of the desert, water is everything. The Living Grove reimagines 
                  what's possible when you work <em>with</em> the land instead of against it.
                </p>
                <p>
                  At its heart: a massive reclaimed water tank, transformed into a living ecosystem. 
                  Fish swim below, plants grow above, and the water cycles endlessly—filtering, 
                  nourishing, sustaining.
                </p>
                <p className="text-foreground/90">
                  Rising from the center, a treehouse sanctuary where you can watch the garden 
                  breathe, the fish swim, and the desert transform into an oasis.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="mb-20">
            <h2 className="text-2xl font-display font-medium text-center text-foreground mb-10">
              The Elements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => <motion.div key={feature.title} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6 + index * 0.1
            }} className="relative p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm group hover:border-primary/30 transition-all duration-300">
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: 'radial-gradient(ellipse at center, hsl(160 50% 40% / 0.1), transparent 70%)'
              }} />
                  <feature.icon className="w-10 h-10 mb-4 text-primary" style={{
                color: 'hsl(160 70% 50%)'
              }} />
                  <h3 className="text-xl font-display font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>)}
            </div>
          </motion.section>

          {/* Development Phases */}
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.7
        }} className="mb-20">
            <h2 className="text-2xl font-display font-medium text-center text-foreground mb-10">
              The Journey
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px" style={{
              background: 'linear-gradient(180deg, hsl(160 60% 50% / 0.5), hsl(185 60% 50% / 0.3), transparent)'
            }} />
              
              <div className="space-y-8">
                {phases.map((phase, index) => <motion.div key={phase.phase} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.15
              }} className="relative pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 rounded-full border-2" style={{
                  borderColor: phase.status === 'in-progress' ? 'hsl(160 70% 50%)' : phase.status === 'planned' ? 'hsl(185 60% 50% / 0.5)' : 'hsl(200 20% 40% / 0.3)',
                  background: phase.status === 'in-progress' ? 'hsl(160 70% 50% / 0.3)' : 'transparent',
                  boxShadow: phase.status === 'in-progress' ? '0 0 15px hsl(160 70% 50% / 0.5)' : 'none'
                }} />
                    
                    <div className="p-5 rounded-lg border border-border/40 bg-card/20 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs tracking-wider uppercase font-body px-2 py-1 rounded" style={{
                      background: phase.status === 'in-progress' ? 'hsl(160 70% 50% / 0.2)' : 'hsl(200 20% 40% / 0.1)',
                      color: phase.status === 'in-progress' ? 'hsl(160 70% 60%)' : 'hsl(200 20% 60%)'
                    }}>
                          {phase.phase}
                        </span>
                        {phase.status === 'in-progress' && <span className="text-xs text-green-400 font-body animate-pulse">
                            Currently Active
                          </span>}
                      </div>
                      <h3 className="text-lg font-display font-medium text-foreground mb-1">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1
        }} className="text-center">
            <div className="p-8 md:p-12 rounded-2xl border border-border/50 backdrop-blur-sm" style={{
            background: 'linear-gradient(135deg, hsl(160 25% 12% / 0.4), hsl(185 20% 10% / 0.5))'
          }}>
              <h2 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-4">
                Help Grow The Grove
              </h2>
              <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto leading-relaxed">
                This vision needs hands, materials, and believers. Whether you can contribute 
                time, resources, or simply want to follow along—every bit helps this oasis become reality.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/offering" className="px-8 py-3 rounded-lg font-display tracking-wider transition-all duration-300 hover:scale-105" style={{
                background: 'linear-gradient(135deg, hsl(160 60% 40%), hsl(185 70% 45%))',
                color: 'white',
                boxShadow: '0 0 20px hsl(160 60% 40% / 0.3)'
              }}>
                  Become a Supporter
                </Link>
                <Link to="/csc" className="px-8 py-3 rounded-lg font-display tracking-wider border border-border/50 text-foreground hover:border-primary/50 transition-all duration-300" style={{
                background: 'hsl(160 20% 15% / 0.3)'
              }}>
                  Explore Trade Options
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>;
};
export default TheLivingGrove;