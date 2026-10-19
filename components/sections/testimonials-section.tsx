"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateRevealProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { top, height } = section.getBoundingClientRect();
      // Tie the reveal to the section's own travel: entering from below starts covered,
      // while an anchored section at the top of the viewport is fully clear.
      const progress = Math.min(1, Math.max(0, (window.innerHeight - top) / height));
      setRevealProgress(progress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateRevealProgress);
    };

    updateRevealProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-background">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
        <Image
          src="/images/testimonial-software-testing.jpg"
          alt="Software is Everything: testing toolchain across load testing, Kubernetes, data pipelines, contract tests and end-to-end checkout flows"
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Four vertical obscuration panels reveal the image in staggered motion. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 grid grid-cols-4"
        >
          {[0, 1, 2, 3].map((panel) => {
            const panelProgress = Math.min(1, Math.max(0, revealProgress * 1.35 - panel * 0.08));
            const direction = panel % 2 === 0 ? -1 : 1;

            return (
              <div
                key={panel}
                className="bg-background/[0.58]"
                style={{
                  transform: `translateY(${direction * panelProgress * 100}%)`,
                  willChange: "transform",
                }}
              />
            );
          })}
        </div>

        <div className="absolute inset-0 z-20 flex items-end justify-center px-6 pb-[61px] md:px-12 md:pb-[93px] lg:px-20 lg:pb-[125px]">
          <p className="mx-auto max-w-5xl text-center text-[22px] leading-relaxed text-white md:text-[28px] lg:text-[38px] lg:leading-snug">
            What defines my work isn&apos;t any single technology it&apos;s a consistent obsession with the
            product problem underneath the code: figuring out what a system needs to do, why it needs to
            do it that way, and where the current design will eventually break.
          </p>
        </div>
      </div>
    </section>
  );
}
