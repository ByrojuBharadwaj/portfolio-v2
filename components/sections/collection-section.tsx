"use client";

import { useEffect, useRef, useState } from "react";
import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "Study",
    price: "1",
    image: "/images/case-study-coming-soon.jpg",
  },
  {
    id: 2,
    name: "Study",
    price: "2",
    image: "/images/case-study-coming-soon.jpg",
  },
  {
    id: 3,
    name: "Study",
    price: "3",
    image: "/images/case-study-coming-soon.jpg",
  },
];

export function CollectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="accessories" className="bg-background">
      {/* Section Title */}
      <div className="overflow-hidden px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2
          className={`text-3xl font-medium tracking-tight text-foreground transition-[clip-path,opacity] duration-[3000ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:text-4xl ${
            isVisible
              ? "opacity-100 [clip-path:circle(150%_at_0%_100%)]"
              : "opacity-0 [clip-path:circle(0%_at_0%_100%)]"
          }`}
        >
          Case Study
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {accessories.map((accessory, index) => (
            <div
              key={accessory.id}
              className={`group flex-shrink-0 w-[75vw] snap-center origin-center transform-gpu transition-[opacity,transform] duration-[2600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "scale-100 opacity-100" : "scale-[0.18] opacity-0"
              }`}
              style={{ transitionDelay: `${index * 180}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={`${accessory.name} ${accessory.price}`}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory, index) => (
            <div
              key={accessory.id}
              className={`group origin-center transform-gpu transition-[opacity,transform] duration-[2600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? "scale-100 opacity-100" : "scale-[0.18] opacity-0"
              }`}
              style={{ transitionDelay: `${index * 180}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={`${accessory.name} ${accessory.price}`}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
