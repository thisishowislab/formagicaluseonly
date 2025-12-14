const WaterfallEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gradient overlay from top */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(var(--background)) 0%, 
            transparent 30%, 
            transparent 70%, 
            hsl(var(--background)) 100%
          )`
        }}
      />

      {/* Subtle vertical flow lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px animate-waterfall"
            style={{
              left: `${12 + i * 12}%`,
              background: `linear-gradient(180deg, 
                transparent 0%, 
                hsl(var(--primary) / 0.5) 20%,
                hsl(var(--primary) / 0.3) 50%,
                hsl(var(--accent) / 0.5) 80%,
                transparent 100%
              )`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom infinity fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            hsl(var(--primary) / 0.05) 50%,
            hsl(var(--background)) 100%
          )`
        }}
      />
    </div>
  );
};

export default WaterfallEffect;
