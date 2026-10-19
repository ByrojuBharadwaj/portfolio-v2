"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback, type CSSProperties, type TouchEvent } from "react";

type GallerySectionProps = {
  enlargeImages?: boolean;
  horizontalMode?: boolean;
  staticMode?: boolean;
  showQuestion?: boolean;
  title?: string;
  sectionId?: string;
};

export function GallerySection({
  enlargeImages = false,
  horizontalMode = false,
  staticMode = false,
  showQuestion = false,
  title = "Experience",
  sectionId = "gallery",
}: GallerySectionProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryTitleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGalleryTitleRevealed, setIsGalleryTitleRevealed] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchLocked = useRef(false);
  const wheelLocked = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setHasAnswered(sessionStorage.getItem("mono-gallery-answered") === "true");

    const gallery = galleryRef.current;
    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px" },
    );
    observer.observe(gallery);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const title = galleryTitleRef.current;
    if (!title) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) {
          setIsGalleryTitleRevealed(true);
        } else if (!entry.isIntersecting) {
          setIsGalleryTitleRevealed(false);
        }
      },
      { threshold: [0, 0.6] },
    );
    observer.observe(title);

    return () => observer.disconnect();
  }, [staticMode]);

  useEffect(() => {
    if (!staticMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedCards((current) => {
          const next = [...current];
          for (const entry of entries) {
            const index = Number((entry.target as HTMLElement).dataset.cardIndex);
            if (entry.intersectionRatio >= 0.35) {
              next[index] = true;
            } else if (!entry.isIntersecting) {
              next[index] = false;
            }
          }
          return next;
        });
      },
      { threshold: [0, 0.35] },
    );
    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, [staticMode]);

  const answerGalleryQuestion = (answer: "Expertise" | "Experience") => {
    setIsAnswering(true);
    sessionStorage.setItem("mono-gallery-answered", "true");

    window.setTimeout(() => {
      setHasAnswered(true);
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    }, 2500);
  };

  // Every card shares one 3:2 frame that fits the viewport; images are letterboxed inside it rather than cropped.
  const cardFrame = "aspect-[3/2] w-[min(100%,105vh)] md:w-[min(100%,120vh)]";

  const images = [
    { src: "/images/experience-1-cognizant.jpg", alt: "Payments and finance platform architecture at Cognizant: Kubernetes, Kafka, MuleSoft and data warehouses" },
    { src: "/images/experience-2-conversational-voice-ai.jpg", alt: "Conversational voice AI agent at ASU: multi-channel voice input routed through models, data stores and human handoff" },
    { src: "/images/experience-3-contents-valuation-ai.jpg", alt: "Contents valuation AI pipeline at TheBest Claims: document intake, item matching across retailers and depreciation pricing" },
    { src: "/images/experience-4-multi-tenant-saas.jpg", alt: "Multi-tenant SaaS platform at InternPro: tenant routing, event queues, Postgres and containerized services" },
  ];

  const updateTransform = useCallback(() => {
    if (!galleryRef.current) return;
    
    const rect = galleryRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = galleryRef.current.offsetHeight;
    
    // Calculate scroll progress through the section
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  const galleryTitle = title;
  const galleryTitleFontSize =
    galleryTitle.length > 10 || galleryTitle.includes(" ") ? `${180 / galleryTitle.length}vw` : undefined;

  const moveImage = useCallback((direction: -1 | 1) => {
    setActiveImageIndex((current) => Math.max(0, Math.min(images.length - 1, current + direction)));
  }, [images.length]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchLocked.current) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;

    touchLocked.current = true;
    moveImage(distance < 0 ? 1 : -1);
    window.setTimeout(() => {
      touchLocked.current = false;
    }, 700);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!horizontalMode || !carousel) return;

    const root = document.documentElement;
    const previousOverscroll = root.style.overscrollBehaviorX;
    // Stops the trackpad's horizontal swipe from triggering browser back/forward navigation.
    root.style.overscrollBehaviorX = "none";

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
      event.preventDefault();
      if (wheelLocked.current) return;

      wheelLocked.current = true;
      moveImage(event.deltaX > 0 || event.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 700);
    };

    // React registers wheel listeners as passive, so preventDefault only works on a native listener.
    carousel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener("wheel", handleWheel);
      root.style.overscrollBehaviorX = previousOverscroll;
    };
  }, [horizontalMode, moveImage]);

  return (
    <section 
      id={sectionId}
      ref={galleryRef}
      className="relative bg-black"
      style={{ minHeight: staticMode ? "auto" : horizontalMode ? "100vh" : `${(images.length + 1) * 100}vh` }}
    >
      {!staticMode && !horizontalMode && images.map((_, index) => (
        <div
          key={index}
          id={`experience-${index + 1}`}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `calc((100% - 100vh) * ${(index + 1) / images.length})` }}
        />
      ))}
      {showQuestion && !hasAnswered && isInView && (
        <div
          className={`gallery-question-overlay fixed inset-0 z-40 flex items-start justify-center bg-black/40 px-6 pt-[calc(50vh-12rem)] backdrop-blur-sm ${isAnswering ? "gallery-question-overlay--closing" : ""}`}
          role="dialog"
          aria-labelledby="gallery-question"
        >
          <div className="gallery-question-card flex w-full max-w-2xl flex-col items-center gap-8 text-center text-white">
            <p className="font-mono text-[11.5px] uppercase tracking-[0.28em] text-white/60">A small question</p>
            <h2 id="gallery-question" className="font-display text-3xl leading-tight md:text-4xl">
              What matters more to you: the years someone has spent doing the work, or the depth of what they can do?
            </h2>
            <div className="flex w-full max-w-xs flex-col gap-3 sm:flex-row">
              {(["Expertise", "Experience"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => answerGalleryQuestion(option)}
                  disabled={isAnswering}
                  className="flex-1 border border-white/50 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-white hover:text-black disabled:pointer-events-none"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section title */}
      <div className="flex h-[53vh] items-end justify-center px-6 pb-8 md:pb-10">
        {staticMode ? (
          <h2 className="translate-y-[30px] whitespace-nowrap text-[24vw] font-bold leading-[0.72] tracking-tighter text-white md:text-[20vw]" style={{ fontSize: galleryTitleFontSize }}>
            {galleryTitle}
          </h2>
        ) : (
          <h2
            ref={galleryTitleRef}
            aria-label={galleryTitle}
            className={`gallery-title ${isGalleryTitleRevealed ? "gallery-title--revealed" : ""} translate-y-[30px] whitespace-nowrap text-[24vw] font-bold leading-[0.72] tracking-tighter text-white md:text-[20vw]`}
            style={{
              "--gallery-title-progress": isGalleryTitleRevealed ? 1 : 0,
              fontSize: galleryTitleFontSize,
            } as CSSProperties}
          >
            {galleryTitle.split("").map((character, index) => (
              <span
                key={`${character}-${index}`}
                aria-hidden="true"
                className="gallery-title__character"
                style={{ "--gallery-character-delay": `${index * 0.12}s` } as CSSProperties}
              >
                {character === " " ? "\u00A0" : character}
              </span>
            ))}
          </h2>
        )}
      </div>

      {/* Sticky container */}
      <div
        ref={carouselRef}
        className={staticMode ? "px-4 pb-16" : "sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4"}
        onTouchStart={horizontalMode ? handleTouchStart : undefined}
        onTouchEnd={horizontalMode ? handleTouchEnd : undefined}
        style={{ touchAction: horizontalMode ? "pan-y" : undefined, overscrollBehaviorX: horizontalMode ? "none" : undefined }}
      >
        <div className={staticMode ? "relative mx-auto w-full max-w-5xl" : `relative mx-auto max-w-5xl ${cardFrame}`}>
          {(staticMode ? images.slice(1) : images).map((image, index) => {
            // The Two-Experience page uses a fixed horizontal carousel; the original pages keep the vertical reveal.
            const imageProgress = (scrollProgress * images.length) - index;
            const stackProgress = Math.max(0, Math.min(1, imageProgress));
            const horizontalDistance = (index - activeImageIndex) * 110;
            let translateY = (1 - stackProgress) * 100;
            let scale = 0.8 + (stackProgress * 0.2);
            let opacity = stackProgress;
            if (horizontalMode) {
              translateY = 0;
              scale = 1;
              opacity = Math.abs(index - activeImageIndex) <= 1 ? 1 : 0;
            }
            const finalScale = scale;
            
            // Calculate z-index so later images appear on top
            const zIndex = index;
            
            return (
              <div
                key={index}
                id={staticMode ? `card-${index + 1}` : undefined}
                ref={staticMode ? (card) => { cardRefs.current[index] = card; } : undefined}
                data-card-index={staticMode ? index : undefined}
                className={staticMode ? "flex w-full scroll-mt-24 items-center justify-center py-6" : "absolute inset-0 flex items-center justify-center"}
                style={{
                  zIndex: staticMode ? undefined : zIndex,
                  transform: staticMode ? "none" : horizontalMode
                    ? `translate3d(${horizontalDistance}%, 0, 0) scale(${finalScale}) translateZ(0)`
                    : `translate3d(0, ${translateY}%, 0) scale(${finalScale}) translateZ(0)`,
                  WebkitTransform: horizontalMode
                    ? `translate3d(${horizontalDistance}%, 0, 0) scale(${finalScale}) translateZ(0)`
                    : `translate3d(0, ${translateY}%, 0) scale(${finalScale}) translateZ(0)`,
                  transition: staticMode ? undefined : horizontalMode ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease" : undefined,
                  opacity: staticMode ? 1 : opacity,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: staticMode ? undefined : "transform, opacity",
                  WebkitFontSmoothing: 'antialiased',
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-xl bg-white md:rounded-2xl ${staticMode ? `experience-card ${cardFrame} ${revealedCards[index] ? "experience-card--revealed" : ""}` : "h-full w-full"}`}
                  role={horizontalMode ? "button" : undefined}
                  tabIndex={horizontalMode ? 0 : undefined}
                  aria-label={horizontalMode ? `Show image ${index + 1}` : undefined}
                  onClick={horizontalMode ? () => setActiveImageIndex(index) : undefined}
                  onKeyDown={horizontalMode ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveImageIndex(index);
                    }
                  } : undefined}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    priority={index < 3}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
