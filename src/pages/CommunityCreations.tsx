import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Handshake, Clock, MessageCircle, Hammer, Palette, Sparkles } from 'lucide-react';
const exchangeTypes = [{
  icon: Handshake,
  title: 'Trade',
  description: 'Have something of value? Tools, materials, art supplies, or your own creations—we believe in the barter economy.',
  color: 'hsl(45 80% 55%)'
}, {
  icon: Hammer,
  title: 'Work Exchange',
  description: 'Skilled labor, help with builds, documentation, photography, or whatever talents you bring—sweat equity counts here.',
  color: 'hsl(185 80% 50%)'
}, {
  icon: Clock,
  title: 'Payment Plans',
  description: 'Need to spread it out? We\'ll work with you on a timeline that makes sense for your situation.',
  color: 'hsl(280 70% 60%)'
}, {
  icon: Palette,
  title: 'Creative Collaboration',
  description: 'Artists, makers, musicians—sometimes the best payment is co-creation. Let\'s make something together.',
  color: 'hsl(320 70% 55%)'
}];
const CommunityCreations = () => {
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 opacity-30" style={{
      background: 'radial-gradient(ellipse at 70% 30%, hsl(45 80% 40% / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 20% 70%, hsl(280 70% 40% / 0.2) 0%, transparent 50%)'
    }} />

      {/* Back navigation */}
      <Link to="/" className="fixed top-6 left-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-body tracking-wide">Return to Sanctum</span>
      </Link>

      <main className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
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
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
              Alternative Economies
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-medium tracking-wider text-foreground mb-6 text-glow-primary">
              Community Supported Creations
            </h1>
            <p className="text-lg text-muted-foreground font-body italic max-w-2xl mx-auto leading-relaxed">
              Money is just one form of exchange. The desert taught us that resourcefulness, 
              community, and mutual aid often hold more value than currency.
            </p>
          </motion.header>

          {/* Philosophy */}
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="mb-16">
            <div className="relative p-8 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-primary/50" />
              <h2 className="text-2xl font-display font-medium text-foreground mb-4">
                The CSC Philosophy
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  Every piece created at The Manifestorium carries the spirit of Slab City—where 
                  community comes together to build something from nothing. We believe that access 
                  to handcrafted, meaningful items shouldn't be limited by financial circumstances alone.
                </p>
                <p>
                  <span className="text-accent">CSC items</span> are specially designated creations where we 
                  welcome alternative forms of payment. If you see something that calls to you but 
                  traditional payment isn't possible, reach out. Let's have a conversation about 
                  what exchange might work.
                </p>
                <p className="italic text-foreground/80">
                  This isn't charity—it's community. Everyone brings something to the table.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Exchange Types */}
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="mb-16">
            <p className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground/60 font-body mb-10">
              Ways to Exchange
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exchangeTypes.map((type, index) => <motion.div key={type.title} initial={{
              opacity: 0,
              x: index % 2 === 0 ? -20 : 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6,
              delay: 0.6 + 0.1 * index
            }} className="p-6 rounded-lg border border-border/30 bg-card/20 group hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{
                  background: `linear-gradient(135deg, ${type.color.replace(')', ' / 0.2)')}, transparent)`
                }}>
                      <type.icon className="w-6 h-6" style={{
                    color: type.color
                  }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-medium text-foreground mb-2" style={{
                    color: type.color
                  }}>
                        {type.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </motion.section>

          {/* How It Works */}
          <motion.section initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="mb-16">
            <p className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground/60 font-body mb-8">
              How It Works
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {[{
              step: '01',
              text: 'Find a CSC-eligible item'
            }, {
              step: '02',
              text: 'Reach out via email'
            }, {
              step: '03',
              text: 'We discuss exchange options'
            }, {
              step: '04',
              text: 'Agree & create together'
            }].map((item, index) => <div key={item.step} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center text-primary font-display text-sm">
                    {item.step}
                  </div>
                  <p className="text-sm text-muted-foreground font-body">{item.text}</p>
                  {index < 3 && <span className="hidden md:block text-muted-foreground/30">→</span>}
                </div>)}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 1
        }} className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-lg border border-accent/30 bg-accent/5">
              <MessageCircle className="w-5 h-5 text-accent" />
              <p className="text-foreground font-body">
                Ready to explore?{' '}
                <a href="mailto:hello@manifestorium.com?subject=CSC Inquiry" className="text-accent hover:text-primary transition-colors font-medium">thisishowislab@gmail.com</a>
              </p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>;
};
export default CommunityCreations;