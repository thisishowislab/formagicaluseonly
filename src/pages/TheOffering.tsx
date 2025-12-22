import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, Gem, Crown, ArrowLeft, Gift, Tent, Wrench, Droplets } from 'lucide-react';

const tiers = [
  {
    id: 'wanderer',
    name: 'Wanderer',
    amount: 20,
    icon: Heart,
    color: 'hsl(185 80% 50%)',
    benefits: [
      'Your name in the Book of Wanderers',
      'Monthly desert dispatch newsletter',
      'Access to community Discord',
    ],
  },
  {
    id: 'seeker',
    name: 'Seeker',
    amount: 50,
    icon: Star,
    color: 'hsl(45 80% 55%)',
    benefits: [
      'All Wanderer benefits',
      'Early access to new realm openings',
      '10% off all CSC items',
      'Quarterly video updates from the bus',
    ],
  },
  {
    id: 'guardian',
    name: 'Guardian',
    amount: 100,
    icon: Gem,
    color: 'hsl(280 70% 60%)',
    benefits: [
      'All Seeker benefits',
      'Exclusive Guardian-only merch annually',
      'Your name etched on the Manifestorium wall',
      'Direct input on realm development',
    ],
  },
  {
    id: 'keeper',
    name: 'Realm Keeper',
    amount: 250,
    icon: Crown,
    color: 'hsl(320 70% 55%)',
    benefits: [
      'All Guardian benefits',
      'Annual care package from the desert',
      'Private virtual tour of new creations',
      'Lifetime 20% off all items',
      'A portal named in your honor',
    ],
  },
];

const wishlistItems = [
  { icon: Droplets, name: 'Water & Supplies', desc: 'Clean water, non-perishables, batteries' },
  { icon: Wrench, name: 'Tools & Materials', desc: 'Hand tools, lumber, fasteners, solar equipment' },
  { icon: Tent, name: 'Camping Gear', desc: 'Tarps, shade structures, coolers' },
  { icon: Gift, name: 'Art Supplies', desc: 'Paint, welding rods, scrap metal, fabric' },
];

const TheOffering = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, hsl(280 70% 30% / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(185 80% 40% / 0.2) 0%, transparent 50%)',
        }}
      />

      {/* Back navigation */}
      <Link 
        to="/"
        className="fixed top-6 left-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-body tracking-wide">Return to Sanctum</span>
      </Link>

      <main className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
              Support the Vision
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-medium tracking-wider text-foreground mb-6 text-glow-primary">
              The Offering
            </h1>
            <p className="text-lg text-muted-foreground font-body italic max-w-2xl mx-auto leading-relaxed">
              The Manifestorium runs on desert ingenuity, community spirit, and the generosity of 
              those who believe in magic born from nothing. Your support keeps the waterfall flowing.
            </p>
          </motion.header>

          {/* Supporter Tiers */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <p className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground/60 font-body mb-10">
              Monthly Patronage Tiers
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at center, ${tier.color.replace(')', ' / 0.15)')} 0%, transparent 70%)`,
                    }}
                  />
                  <div className="relative p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
                      style={{
                        background: `linear-gradient(135deg, ${tier.color.replace(')', ' / 0.2)')}, transparent)`,
                        boxShadow: `0 0 20px ${tier.color.replace(')', ' / 0.3)')}`,
                      }}
                    >
                      <tier.icon className="w-6 h-6" style={{ color: tier.color }} />
                    </div>

                    {/* Name & Price */}
                    <h3 
                      className="text-xl font-display font-medium text-center mb-2"
                      style={{ color: tier.color }}
                    >
                      {tier.name}
                    </h3>
                    <p className="text-3xl font-display font-semibold text-foreground text-center mb-4">
                      ${tier.amount}<span className="text-sm text-muted-foreground font-body">/month</span>
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-2 flex-1">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-muted-foreground font-body flex items-start gap-2">
                          <span style={{ color: tier.color }}>✦</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.a
                      href={`mailto:hello@manifestorium.com?subject=Become a ${tier.name}&body=I'd like to become a ${tier.name} ($${tier.amount}/month) supporter of The Manifestorium.`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 block w-full py-3 rounded text-center font-display tracking-widest text-sm uppercase transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${tier.color.replace(')', ' / 0.2)')}, ${tier.color.replace(')', ' / 0.1)')})`,
                        border: `1px solid ${tier.color.replace(')', ' / 0.5)')}`,
                        color: tier.color,
                      }}
                    >
                      Join
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Physical Wishlist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground/60 font-body mb-6">
              Things We Always Need
            </p>
            <p className="text-center text-muted-foreground font-body italic mb-8">
              Visiting in person? The desert demands certain offerings.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + (0.1 * index) }}
                  className="p-4 rounded-lg border border-border/30 bg-card/30 text-center group hover:border-primary/30 transition-colors duration-300"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  <p className="font-display text-sm text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground font-body">
              Questions? Reach out at{' '}
              <a href="mailto:hello@manifestorium.com" className="text-primary hover:text-accent transition-colors">
                hello@manifestorium.com
              </a>
            </p>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default TheOffering;
