import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  scale?: number;
  delay?: number;
  className?: string;
}

const AnimatedContent = ({
  children,
  distance = 40,
  direction = "vertical",
  reverse = false,
  duration = 0.6,
  ease = "power3.out",
  initialOpacity = 0,
  scale = 1,
  delay = 0,
  className = "",
}: AnimatedContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: initialOpacity,
      visibility: "visible",
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              [axis]: 0,
              scale: 1,
              opacity: 1,
              duration,
              ease,
              delay,
            });
          } else {
            gsap.set(el, {
              [axis]: offset,
              scale,
              opacity: initialOpacity,
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [distance, direction, reverse, duration, ease, initialOpacity, scale, delay]);

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  );
};

export default AnimatedContent;
