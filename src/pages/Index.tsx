import { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/stratixos-logo.png";
import GlowOrb from "@/components/GlowOrb";

type Slide = {
  id: string;
  nav: string;
  kicker: string;
  title: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
};

function pad3(n: number) {
  return String(n).padStart(3, "0");
}

const Index = () => {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "home",
        nav: "Home",
        kicker: "STRATIXOS",
        title: "Never miss a lead again.",
        body: "AI-powered agents that answer calls, book appointments, and capture leads 24/7 — so you never lose another customer.",
        primaryCta: "Get in touch",
        secondaryCta: "Our services",
      },
      {
        id: "services",
        nav: "Services",
        kicker: "What we do",
        title: "Your AI workforce, always on.",
        body: "From inbound call handling to appointment booking, our AI agents work around the clock so your team can focus on closing.",
        primaryCta: "View services",
        secondaryCta: "Talk to us",
      },
      {
        id: "how-it-works",
        nav: "How It Works",
        kicker: "Simple setup",
        title: "Live in days, not months.",
        body: "We learn your business, configure your AI agents, and go live — with ongoing optimization to keep results climbing.",
        primaryCta: "Start now",
        secondaryCta: "Learn more",
      },
      {
        id: "results",
        nav: "Results",
        kicker: "Proven impact",
        title: "391% more leads captured.",
        body: "Zero missed calls. 24/7 availability. Our clients see dramatic increases in lead conversion from day one.",
        primaryCta: "See results",
        secondaryCta: "Get a quote",
      },
      {
        id: "contact",
        nav: "Contact",
        kicker: "Let's build",
        title: "Ready to automate your growth?",
        body: "Tell us about your business. We'll map your workflows and ship your first AI agent fast.",
        primaryCta: "Book a call",
        secondaryCta: "Email us",
      },
    ],
    []
  );

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const sections = slides
      .map((s) => sectionRefs.current[s.id])
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const id = (visible.target as HTMLElement).dataset.slideId;
        const idx = slides.findIndex((s) => s.id === id);
        if (idx >= 0) setActiveIndex(idx);
      },
      { root, threshold: [0.55] }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides]);

  const scrollToSlide = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-500 via-zinc-400 to-zinc-300">
      {/* soft background haze */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        {/* card frame */}
        <div className="relative w-full max-w-5xl rounded-3xl bg-white/35 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-black/10">
          {/* inner frame */}
          <div className="relative overflow-hidden rounded-2xl bg-zinc-100/70 ring-1 ring-black/10">
            {/* top nav */}
            <div className="sticky top-0 z-20 border-b border-black/10 bg-white/35 backdrop-blur-xl">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="StratixOS" className="h-6 w-6" />
                  <span className="text-xs font-semibold tracking-[0.22em] text-black/70">
                    STRATIXOS
                  </span>
                </div>
                <div className="hidden gap-7 md:flex">
                  {slides.map((s, i) => {
                    const active = i === activeIndex;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollToSlide(s.id)}
                        className={[
                          "relative text-[11px] uppercase tracking-[0.22em] text-black/55 transition",
                          active ? "text-black/85" : "hover:text-black/75",
                        ].join(" ")}
                      >
                        {s.nav}
                        {active && (
                          <span className="absolute -bottom-3 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-full bg-amber-300/80" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-black/55">
                  {pad3(activeIndex + 1)} / {pad3(slides.length)}
                </div>
              </div>
            </div>

            {/* scroll snap area */}
            <div
              ref={scrollerRef}
              className="h-[620px] w-full overflow-y-auto scroll-smooth snap-y snap-mandatory"
            >
              {slides.map((s, i) => (
                <section
                  key={s.id}
                  ref={(el) => {
                    sectionRefs.current[s.id] = el;
                  }}
                  data-slide-id={s.id}
                  className="snap-start"
                >
                  <div className="relative h-[620px] px-6 py-10 md:px-10">
                    <div className="absolute left-6 top-6 text-[10px] tracking-[0.22em] text-black/35 md:left-10">
                      {pad3(i + 1)} / {pad3(slides.length)}
                    </div>

                    <div className="grid h-full grid-cols-1 items-center gap-10 md:grid-cols-2">
                      {/* text */}
                      <div className="max-w-xl">
                        <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/55">
                          {s.kicker}
                        </div>
                        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black/85 md:text-4xl">
                          {s.title}
                        </h1>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55">
                          {s.body}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                          <button className="rounded-full bg-black px-5 py-2 text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-black/80">
                            {s.primaryCta}
                          </button>
                          <button className="rounded-full border border-black/15 bg-white/35 px-5 py-2 text-xs font-semibold tracking-wide text-black/75 backdrop-blur transition hover:bg-white/50">
                            {s.secondaryCta}
                          </button>
                        </div>
                        <div className="mt-10 text-xs text-black/40">
                          AI-powered call handling & appointment booking for businesses that never sleep.
                        </div>
                      </div>

                      {/* visual */}
                      <div className="flex items-center justify-center">
                        <GlowOrb />
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* bottom bar */}
            <div className="flex items-center justify-center border-t border-black/10 bg-white/20 py-3">
              <img src={logo} alt="StratixOS" className="h-5 w-5 opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
