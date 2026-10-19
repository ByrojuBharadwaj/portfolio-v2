"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type HeaderProps = {
  experienceMode?: boolean;
  twoExperienceMode?: boolean;
  threeExperienceMode?: boolean;
};

const experienceLinks = [
  { label: "Cognizant", href: "#experience-1" },
  { label: "ASU", href: "#experience-2" },
  { label: "TheBest Claims", href: "#experience-3" },
  { label: "InternPro", href: "#experience-4" },
];

export function Header({ experienceMode = false, twoExperienceMode = false, threeExperienceMode = false }: HeaderProps) {
  const isSubPage = experienceMode || twoExperienceMode || threeExperienceMode;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-4 left-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 transition-all duration-300 ${isAtTop ? "pointer-events-none -translate-y-4 opacity-0" : "translate-y-0 opacity-100"} ${isScrolled ? "bg-background/70 backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo */}
        <Link href={isSubPage ? "/" : "#hero"} className="text-lg font-medium tracking-tight transition-colors duration-300 text-foreground">
          Byroju
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {experienceMode ? (
            experienceLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm transition-colors text-muted-foreground hover:text-foreground">{link.label}</Link>
            ))
          ) : threeExperienceMode ? (
            <>
              <Link href="/" className="text-sm transition-colors text-muted-foreground hover:text-foreground">Main Page</Link>
              <Link href="#card-1" className="text-sm transition-colors text-muted-foreground hover:text-foreground">Card 1</Link>
              <Link href="#card-2" className="text-sm transition-colors text-muted-foreground hover:text-foreground">Card 2</Link>
              <Link href="#card-3" className="text-sm transition-colors text-muted-foreground hover:text-foreground">Card 3</Link>
            </>
          ) : twoExperienceMode ? (
            <Link href="#two-experience" className="text-sm transition-colors text-muted-foreground hover:text-foreground">My Projects</Link>
          ) : (
            <>
              <Link href="#technology" className="text-sm transition-colors text-muted-foreground hover:text-foreground">Engineer</Link>
              <Link href="#gallery" className="text-sm transition-colors text-muted-foreground hover:text-foreground">Experience</Link>
              <Link href="#accessories" className="text-sm transition-colors text-muted-foreground hover:text-foreground">Case Study</Link>
              <Link href="#about" className="text-sm transition-colors text-muted-foreground hover:text-foreground">About</Link>
            </>
          )}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href={isSubPage ? "/#contact" : "#contact"}
            className="px-4 py-2 text-sm font-medium transition-all rounded-full bg-foreground text-background hover:opacity-80"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            {experienceMode ? (
              experienceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
              ))
            ) : threeExperienceMode ? (
              <>
                <Link href="/" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Main Page</Link>
                <Link href="#card-1" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Card 1</Link>
                <Link href="#card-2" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Card 2</Link>
                <Link href="#card-3" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Card 3</Link>
              </>
            ) : twoExperienceMode ? (
              <Link href="#two-experience" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>My Projects</Link>
            ) : (
              <>
                <Link href="#technology" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Engineer</Link>
                <Link href="#gallery" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Experience</Link>
                <Link href="#accessories" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Case Study</Link>
                <Link href="#about" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>About</Link>
              </>
            )}
            <Link
              href={isSubPage ? "/#contact" : "#contact"}
              className="mt-4 bg-foreground px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
