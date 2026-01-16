import { motion } from 'framer-motion';
import RealmPortal from './RealmPortal';
import SanctumNav from './SanctumNav';
import WaterfallEffect from './WaterfallEffect';
interface SanctumProps {
  onReplayIntro?: () => void;
}
const portals = [{
  id: 'the-grove',
  name: 'The Living Grove',
  description: 'A realm of water, growth, and circular ecosystems',
  available: true,
  href: '/the-living-grove',
  color: 'realm-unknown1'
}, {
  id: 'realm-2',
  name: 'Realm Awaiting',
  description: 'Something stirs beyond',
  available: false,
  color: 'realm-unknown2'
}, {
  id: 'realm-3',
  name: 'Realm Awaiting',
  description: 'The threshold remains sealed',
  available: false,
  color: 'realm-unknown3'
}];
const Sanctum = ({
  onReplayIntro
}: SanctumProps) => {
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Waterfall to infinity - subtle background effect */}
      <WaterfallEffect />

      {/* Navigation */}
      <SanctumNav onReplayIntro={onReplayIntro} />

      {/* Main content */}
      <main className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.header initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
              Welcome to
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-wider text-foreground mb-6 text-glow-primary">
              The Manifestorium
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body italic max-w-xl mx-auto leading-relaxed">Where off-grid tech, desert salvage, and handmade myth collide to prove that creation doesn't belong to the rich, the plugged-in, or the polished.</p>
            <p className="text-base text-muted-foreground/80 font-body mt-4 max-w-lg mx-auto">Everything is an experiment. You're invited to participate, not spectate. With improvisation as law and tech as a paintbrush, your weirdest ideas are suddenly fair game.</p>
          </motion.header>

          {/* Portals to other realms */}
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }}>
            <p className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground/60 font-body mb-8">
              Portals to Other Realms
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {portals.map((portal, index) => <RealmPortal key={portal.id} realm={portal} index={index} />)}
            </div>
          </motion.section>

          {/* Artifacts teaser */}
          <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="mt-24 text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground/60 font-body">
              Relics and artifacts await within each realm
            </p>
          </motion.section>
        </div>
      </main>

      {/* Desert origin footer */}
      <footer className="relative z-10 py-12 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground font-body italic">
            Born from Slab City, where the desert teaches you to fix what you can 
            and manifest what you can't
          </p>
        </div>
      </footer>
    </div>;
};
export default Sanctum;