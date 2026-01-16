import { motion } from 'framer-motion';
import { Menu, X, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
interface SanctumNavProps {
  onReplayIntro?: () => void;
}
const SanctumNav = ({
  onReplayIntro
}: SanctumNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{
    label: 'The Offering',
    href: '/offering',
    isRoute: true
  }, {
    label: 'CSC',
    href: '/csc',
    isRoute: true
  }, {
    label: 'About',
    href: '#about',
    isRoute: false
  }];
  return <motion.nav initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-display text-lg tracking-wider text-foreground hover:text-primary transition-colors duration-300">For Magical Use Only</Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-body">
                  {item.label}
                </Link> : <a key={item.label} href={item.href} className="text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-body">
                  {item.label}
                </a>)}
            {onReplayIntro && <button onClick={onReplayIntro} className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body group" title="Replay Intro">
                <RotateCcw className="w-4 h-4 group-hover:rotate-[-360deg] transition-transform duration-700" />
                <span className="hidden lg:inline">Replay</span>
              </button>}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-2" aria-label="Toggle menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-4">
            {navItems.map(item => item.isRoute ? <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)} className="block text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-body">
                  {item.label}
                </Link> : <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="block text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-body">
                  {item.label}
                </a>)}
            {onReplayIntro && <button onClick={() => {
          setIsOpen(false);
          onReplayIntro();
        }} className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-primary hover:text-primary/80 transition-colors duration-300 font-body">
                <RotateCcw className="w-4 h-4" />
                Replay Intro
              </button>}
          </div>
        </motion.div>}
    </motion.nav>;
};
export default SanctumNav;