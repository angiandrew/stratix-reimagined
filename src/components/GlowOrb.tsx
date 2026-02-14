const GlowOrb = () => (
  <div className="relative mx-auto aspect-square w-[62%] max-w-[520px] min-w-[260px]">
    <div className="absolute inset-0 rounded-full border border-foreground/10" />
    <div className="absolute inset-[10%] rounded-full border border-foreground/10" />
    <div className="absolute inset-[20%] rounded-full border border-foreground/10" />
    <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-foreground/10 to-transparent blur-[0.2px]" />
    <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/5 blur-xl" />
    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/60 blur-xl" />
    <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300/70 blur-lg" />
    <div className="absolute right-[18%] top-[22%] h-6 w-6 rounded-full bg-amber-200/60 blur-md" />
    <div className="absolute left-[22%] bottom-[24%] h-8 w-8 rounded-full bg-orange-200/50 blur-lg" />
    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-foreground/5" />
  </div>
);

export default GlowOrb;
