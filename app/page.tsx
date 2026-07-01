"use client";

import { useEffect, useState, useRef } from "react";

/* ── SCROLL REVEAL ── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
}

/* ── SECTION HEADING ── */
function Heading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-5 mb-16">
      <h2 className="text-3xl font-bold shrink-0" style={{ fontFamily: "'Nunito', sans-serif", color: light ? "#1a2540" : "#e8edf8" }}>
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: light ? "#d0dae8" : "#1e2d45" }} />
    </div>
  );
}

/* ── TIMELINE ITEM ── */
function TimelineItem({ title, subtitle, date, location, bullets, light = false, last = false }: {
  title: string; subtitle: string; date: string; location?: string; bullets?: string[]; light?: boolean; last?: boolean;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center" style={{ minWidth: 20 }}>
        <div className="w-4 h-4 rounded-full border-2 shrink-0 mt-1" style={{ borderColor: "#2563eb", backgroundColor: light ? "#f0f4f8" : "#0d1225" }} />
        {!last && <div className="flex-1 w-px mt-1" style={{ backgroundColor: light ? "#d0dae8" : "#1e2d45", minHeight: 40 }} />}
      </div>
      <div className="pb-12">
        <p className="text-[11px] tracking-[0.15em] uppercase mb-1 font-semibold" style={{ color: "#2563eb" }}>
          {date}{location ? ` · ${location}` : ""}
        </p>
        <h3 className="text-lg font-bold mb-0.5" style={{ fontFamily: "'Nunito', sans-serif", color: light ? "#1a2540" : "#e8edf8" }}>{title}</h3>
        <p className="text-base font-semibold mb-3" style={{ color: "#e8edf8" }}>{subtitle}</p>
        {bullets && bullets.length > 0 && (
          <ul className="space-y-1.5">
            {bullets.map((b, i) => (
              <li key={i} className="text-[15px] leading-7 flex gap-2" style={{ color: light ? "#4a6080" : "#9eb0cc" }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#2563eb", marginTop: 9 }} />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── INLINE LINK ── */
function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ color: "#2563eb", textDecoration: "underline", textUnderlineOffset: "3px" }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#1a48c4"; }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#2563eb"; }}
    >
      {children}
    </a>
  );
}

/* ── PROJECT BUTTON ── */
function ProjectBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 font-bold transition-all duration-200 text-center"
      style={{ border: "1px solid #ffffff", color: "#ffffff" }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#0d1225"; }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#ffffff"; }}
    >
      {children}
    </a>
  );
}

/* ── OUTLINE BUTTON ── */
function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block text-[11px] tracking-[0.2em] uppercase px-6 py-3 font-bold transition-all duration-200"
      style={{ border: "2px solid #1a2540", color: "#1a2540" }}
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#1a2540"; e.currentTarget.style.color = "#f0f4f8"; }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a2540"; }}
    >
      {children}
    </a>
  );
}

/* ── INVOLVEMENT SLIDESHOW ── */
function InvolvementSlideshow({ photos, positions }: { photos: string[]; positions?: string[] }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const go = (next: number, dir: "left" | "right") => {
    if (animating || next === current) return;
    setDirection(dir);
    setOutgoing(current);
    setAnimating(true);
    setCurrent(next);
    setTimeout(() => {
      setOutgoing(null);
      setAnimating(false);
    }, 500);
  };

  const getPos = (i: number) => positions?.[i] ?? "center";

  return (
    <div className="w-full aspect-[4/3] overflow-hidden relative" style={{ border: "1px solid #1e2d45" }}>
      <style>{`
        .slide-enter-right { animation: slideFromRight 500ms cubic-bezier(.4,0,.2,1) forwards; }
        .slide-enter-left  { animation: slideFromLeft  500ms cubic-bezier(.4,0,.2,1) forwards; }
        .slide-exit-right  { animation: slideToLeft    500ms cubic-bezier(.4,0,.2,1) forwards; }
        .slide-exit-left   { animation: slideToRight   500ms cubic-bezier(.4,0,.2,1) forwards; }
        @keyframes slideFromRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideFromLeft  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideToLeft    { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @keyframes slideToRight   { from { transform: translateX(0); } to { transform: translateX(100%); } }
        .slide-img { transition: transform 500ms ease; }
        .slide-img:hover { transform: scale(1.05); }
      `}</style>

      {/* Exiting image */}
      {outgoing !== null && (
        <img
          src={photos[outgoing]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover ${direction === "right" ? "slide-exit-right" : "slide-exit-left"}`}
          style={{ filter: "brightness(0.85)", objectPosition: getPos(outgoing) }}
        />
      )}
      {/* Entering image */}
      <img
        key={current}
        src={photos[current]}
        alt={`Slide ${current + 1}`}
        className={`absolute inset-0 w-full h-full object-cover slide-img ${outgoing !== null ? (direction === "right" ? "slide-enter-right" : "slide-enter-left") : ""}`}
        style={{ filter: "brightness(0.85)", objectPosition: getPos(current) }}
      />

      <button onClick={() => go(current === 0 ? photos.length - 1 : current - 1, "left")} className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 z-10 transition-all duration-200" style={{ backgroundColor: "rgba(13,18,37,0.8)", border: "1px solid #1e2d45", color: "#e8edf8" }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button onClick={() => go(current === photos.length - 1 ? 0 : current + 1, "right")} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 z-10 transition-all duration-200" style={{ backgroundColor: "rgba(13,18,37,0.8)", border: "1px solid #1e2d45", color: "#e8edf8" }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 15l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {photos.map((_, i) => (
          <button key={i} onClick={() => go(i, i > current ? "right" : "left")} className="w-2 h-2 rounded-full transition-all duration-200" style={{ backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.4)" }} />
        ))}
      </div>
    </div>
  );
}

/* ── INVOLVEMENT VIDEO ── */
function InvolvementVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleWatch = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    if (v.requestFullscreen) v.requestFullscreen();
    else if ((v as any).webkitEnterFullscreen) (v as any).webkitEnterFullscreen();
    v.play();
  };

  return (
    <div>
      <div className="w-full aspect-[4/3] overflow-hidden relative" style={{ border: "1px solid #1e2d45" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        >
          <source src="/hb198.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleWatch}
            className="text-[11px] tracking-[0.2em] uppercase px-6 py-3 font-bold transition-all duration-200"
            style={{ border: "2px solid #ffffff", color: "#ffffff", backgroundColor: "rgba(13,18,37,0.5)", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = "#2563eb"; e.currentTarget.style.borderColor = "#2563eb"; }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = "rgba(13,18,37,0.5)"; e.currentTarget.style.borderColor = "#ffffff"; }}
          >
            ▶ Watch My Testimony
          </button>
        </div>
      </div>
      <div className="mt-4">
        <a
          href="https://www.ohiohouse.gov/legislation/134/hb198/committee"
          target="_blank"
          rel="noreferrer"
          className="inline-block text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 font-bold transition-all duration-200"
          style={{ border: "1px solid #ffffff", color: "#ffffff" }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#0d1225"; }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#ffffff"; }}
        >
          Learn About HB 198
        </a>
      </div>
    </div>
  );
}

/* ── LOADER ── */
function Loader({ done }: { done: boolean }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700"
      style={{ backgroundColor: "#0d1225", opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
    >
      <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
        <svg className="absolute inset-0" width="80" height="80" viewBox="0 0 80 80" style={{ animation: "spin 1.2s linear infinite" }}>
          <circle cx="40" cy="40" r="34" fill="none" stroke="#1e2d45" strokeWidth="3" />
          <circle cx="40" cy="40" r="34" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="60 154" strokeLinecap="round" />
        </svg>
        <span style={{ fontFamily: "'Rhodium Libre', serif", fontSize: "2rem", color: "#e8edf8", lineHeight: 1 }}>N</span>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar({ visible }: { visible: boolean }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const links: { label: string; href: string; dropdown?: { label: string; href: string }[] }[] = [
    { label: "Overview", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Involvement", href: "#involvement", dropdown: [
      { label: "Care360 Legacy", href: "/care360" },
      { label: "Disney Dreamers", href: "#disney" },
      { label: "HB 198", href: "#hb198" },
    ]},
    { label: "Projects", href: "#projects", dropdown: [
      { label: "Can Recycler", href: "/can-recycler" },
      { label: "NFL Stats", href: "/nfl-stats" },
    ]},
    { label: "Connect", href: "#contact" },
    { label: "More", href: "#", dropdown: [
      { label: "Recommendations", href: "/recommendations" },
    ]},
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        backgroundColor: "rgba(13, 18, 37, 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div ref={navRef} className="px-6 md:px-20 max-w-6xl mx-auto flex items-center justify-between" style={{ height: 60 }}>
        <span className="text-sm font-bold tracking-[0.1em]" style={{ color: "#e8edf8", fontFamily: "'Rhodium Libre', serif" }}>
          Nolan Pastore
        </span>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase font-bold transition-colors duration-200"
                  style={{ color: openDropdown === link.label ? "#ffffff" : "#7a90b8", background: "none", border: "none", cursor: "pointer" }}
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: openDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }}>
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div
                  className="absolute top-full right-0 mt-2 py-1 min-w-[160px]"
                  style={{
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    backgroundColor: "rgba(13, 18, 37, 0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    opacity: openDropdown === link.label ? 1 : 0,
                    transform: openDropdown === link.label ? "translateY(0) scaleY(1)" : "translateY(-8px) scaleY(0.95)",
                    transformOrigin: "top",
                    transition: "opacity 200ms ease, transform 200ms ease",
                    pointerEvents: openDropdown === link.label ? "auto" : "none",
                  }}
                >
                  {link.label !== "More" && (
                    <a
                      href={link.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold transition-colors duration-200"
                      style={{ color: "#7a90b8" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.backgroundColor = "rgba(37,99,235,0.15)"; }}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#7a90b8"; e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {link.label === "Projects" ? "All Projects" : `All ${link.label}`}
                    </a>
                  )}
                  {link.dropdown.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold transition-colors duration-200"
                      style={{ color: "#7a90b8" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.backgroundColor = "rgba(37,99,235,0.15)"; }}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#7a90b8"; e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.15em] uppercase font-bold transition-colors duration-200"
                style={{ color: "#7a90b8" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = "#7a90b8"; }}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

/* ── PAGE ── */
export default function Home() {
  const [show, setShow] = useState(false);
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [navVisible, setNavVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fullText = "Hi, I'm Nolan";
  const pause = 4;

  useEffect(() => {
    const img = new Image();
    img.src = "/nolan.jpg";
    img.onload = () => { setLoaded(true); setTimeout(() => setShow(true), 900); };
    img.onerror = () => { setLoaded(true); setTimeout(() => setShow(true), 900); };
  }, []);

  useEffect(() => {
    if (!show) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < pause) {
        i++;
        setTyped(fullText.slice(0, i));
        if (i === pause) {
          clearInterval(interval);
          setTimeout(() => {
            let j = pause;
            const rest = setInterval(() => {
              j++;
              setTyped(fullText.slice(0, j));
              if (j >= fullText.length) clearInterval(rest);
            }, 75);
          }, 500);
        }
      }
    }, 75);
    return () => clearInterval(interval);
  }, [show]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const img = document.getElementById("parallax-hero") as HTMLImageElement | null;
    const handleParallax = () => {
      if (!img) return;
      img.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener("scroll", handleParallax, { passive: true });
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  return (
    <main style={{ fontFamily: "'Nunito', sans-serif" }}>
      <Loader done={loaded} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Rhodium+Libre&display=swap');
        ::placeholder { color: #3a5070; }
        input, textarea, button { font-family: 'Nunito', sans-serif; }
        @keyframes bounceArrow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .bounce-arrow { animation: bounceArrow 1.8s ease-in-out infinite; }
      `}</style>

      <Navbar visible={navVisible} />

      {/* HERO */}
      <section className="relative w-full flex items-center overflow-hidden" style={{ backgroundColor: "#0d1225", minHeight: "100svh" }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/nolan.jpg"
            alt="Nolan Pastore"
            id="parallax-hero"
            className="absolute w-full object-cover"
            style={{ filter: "brightness(0.75) saturate(0.9)", top: "0%", height: "130%", objectPosition: "center 85%" }}
          />
          <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to left, rgba(13,18,37,0.95) 45%, rgba(13,18,37,0.6) 62%, transparent 78%)" }} />
          <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, rgba(13,18,37,0.95) 20%, rgba(13,18,37,0.3) 50%, transparent 80%)" }} />
        </div>
        <div className="relative z-10 ml-auto w-[42%] pr-16 md:pr-24 text-left hidden md:block">
          <h1 style={{ fontFamily: "'Rhodium Libre', serif", fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 400, letterSpacing: "-0.01em", color: "#e8edf8", lineHeight: 1.05, minHeight: "1.1em", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
            {typed}
            <span style={{ display: "inline-block", width: "3px", height: "0.85em", backgroundColor: "#2563eb", marginLeft: "4px", verticalAlign: "middle", opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s", borderRadius: "1px" }} />
          </h1>
          <p className={`mt-3 ml-1 text-lg font-medium transition-all duration-1000 delay-[1700ms] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ color: "#e8edf8", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
            Student, Developer, and All-Around Nice Guy
          </p>
        </div>
        <div className="relative z-10 md:hidden absolute bottom-20 left-0 right-0 px-8 text-center">
          <h1 style={{ fontFamily: "'Rhodium Libre', serif", fontSize: "clamp(2.2rem, 10vw, 3.5rem)", fontWeight: 400, letterSpacing: "-0.01em", color: "#e8edf8", lineHeight: 1.05, minHeight: "1.1em", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
            {typed}
            <span style={{ display: "inline-block", width: "3px", height: "0.85em", backgroundColor: "#2563eb", marginLeft: "4px", verticalAlign: "middle", opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s", borderRadius: "1px" }} />
          </h1>
          <p className={`mt-3 text-base font-medium transition-all duration-1000 delay-[1700ms] ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ color: "#e8edf8", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
            Student, Developer, and All-Around Nice Guy
          </p>
        </div>
        <a href="#about" style={{ textDecoration: "none" }} className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-[2600ms] ${show ? "opacity-100" : "opacity-0"}`}>
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: "#ffffff" }}>scroll</span>
          <div className="bounce-arrow" style={{ color: "#ffffff" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M10 16l-4-4M10 16l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="px-6 md:px-20 py-24 max-w-6xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-[300px_1fr] gap-16 md:gap-24">
              <div>
                {[
                  ["NAME", "Nolan Pastore"],
                  ["SCHOOL", "University of Dayton"],
                  ["PROGRAM", "CIS + Communication Management"],
                  ["GRADE", "Rising Junior"],
                  ["LOCATION", "Pittsburgh, PA"],
                  ["INTERESTS", "Technology Strategy · Business Systems · Communication"],
                ].map(([label, value], i) => (
                  <div key={i} className="py-4" style={{ borderBottom: "1px solid #d0dae8" }}>
                    <p className="text-sm leading-6">
                      <span className="font-extrabold tracking-[0.15em]" style={{ fontFamily: "'Playfair Display', serif", color: "#1a2540" }}>{label}:{" "}</span>
                      <span className="font-medium" style={{ color: "#4a6080" }}>{value}</span>
                    </p>
                  </div>
                ))}
                <div className="pt-7">
                  <a
                    href="https://www.linkedin.com/in/nolanpastore/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="transition-all duration-200"
                    style={{ border: "2px solid #1a2540", color: "#1a2540", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#1a2540"; e.currentTarget.style.color = "#f0f4f8"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a2540"; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="space-y-5 text-[15px] leading-8 font-medium" style={{ color: "#4a6080" }}>
                <p>I'm an Honors student at the University of Dayton pursuing degrees in Computer Information Systems and Communication Management, graduating in May 2028.</p>
                <p>My interests sit at the intersection of technology, business, and people. Through my internship at <InlineLink href="#experience">PNC Bank</InlineLink>, my work in technical support, and people-facing roles such as tour guiding, I've developed a strong passion for how organizations use technology to support meaningful outcomes for the people they serve.</p>
                <p>Outside of academics and work, I am deeply committed to community engagement. Whether volunteering to preserve life stories for hospice patients through <InlineLink href="#care360">Care360</InlineLink>, facilitating <InlineLink href="#interfaith">interfaith dialogue</InlineLink> on my college campus, or representing student voices at <InlineLink href="#sga">student government meetings,</InlineLink> I'm most energized by work that brings people closer together.</p>
                <div className="pt-2 flex items-center gap-4 flex-wrap">
                  <a
                    href="/Nolan_Pastore_Resume.pdf"
                    target="_blank"
                    className="inline-block text-[11px] tracking-[0.2em] uppercase px-6 py-3 font-bold transition-all duration-200"
                    style={{ border: "2px solid #1a2540", color: "#1a2540" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#1a2540"; e.currentTarget.style.color = "#f0f4f8"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a2540"; }}
                  >
                    Download Resume
                  </a>
                  <a
                    href="/recommendations"
                    className="inline-block text-[11px] tracking-[0.2em] uppercase px-6 py-3 font-bold transition-all duration-200"
                    style={{ border: "2px solid #1a2540", color: "#1a2540" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#1a2540"; e.currentTarget.style.color = "#f0f4f8"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1a2540"; }}
                  >
                    Letters of Rec
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ backgroundColor: "#0d1225" }}>
        <div className="px-6 md:px-20 py-24 max-w-6xl mx-auto">
          <Reveal>
            <Heading>Experience</Heading>
            <div className="max-w-3xl">
              {[
                { role: "Technology Intern", org: "PNC Bank", date: "Jun 2026 — Present", location: "Pittsburgh, PA", bullets: ["Built a Microsoft Copilot AI assistant to streamline data analysis and project work.", "Designed Power BI dashboards with SharePoint and Power Automate to drive business insights."] },
                { role: "Student Ambassador (Tour Guide)", org: "University of Dayton", date: "Aug 2025 — Present", location: "Dayton, OH", bullets: ["Lead campus tours for prospective students and families.", "Support admission events and represent UD with professionalism and enthusiasm."] },
                { role: "Technical Support Representative", org: "University of Dayton", date: "Mar 2025 — Present", location: "Dayton, OH", bullets: ["Assist with hardware, software, network, and account issues through in-person help desk and phone line.", "Document and escalate unresolved issues; support university Windows systems."] },
                { role: "Social Media Coordinator", org: "Hartville RV Center, Inc.", date: "Apr 2019 — Jan 2025", location: "Hartville, OH", bullets: ["Managed all social media platforms and content strategy.", "Designed marketing materials; automated content creation to boost reach and conversions."] },
              ].map((item, i, arr) => (
                <Reveal key={i} delay={i * 60}>
                  <TimelineItem title={item.role} subtitle={item.org} date={item.date} location={item.location} bullets={item.bullets} light={false} last={i === arr.length - 1} />
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="px-6 md:px-20 py-24 max-w-6xl mx-auto">
          <Reveal>
            <Heading light>Education</Heading>
            <div className="max-w-3xl">
              <Reveal delay={0}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center" style={{ minWidth: 20 }}>
                    <div className="w-4 h-4 rounded-full border-2 shrink-0 mt-1" style={{ borderColor: "#2563eb", backgroundColor: "#f0f4f8" }} />
                    <div className="flex-1 w-px mt-1" style={{ backgroundColor: "#d0dae8", minHeight: 40 }} />
                  </div>
                  <div className="pb-12 flex-1">
                    <p className="text-[11px] tracking-[0.15em] uppercase mb-1 font-semibold" style={{ color: "#2563eb" }}>Aug 2024 — May 2028</p>
                    <h3 className="text-lg font-bold mb-0.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#1a2540" }}>University of Dayton</h3>
                    <p className="text-sm font-semibold mb-5" style={{ color: "#4a6080" }}>Bachelor's Degree (In Progress)</p>
                    <div className="space-y-4 text-sm leading-7" style={{ color: "#4a6080" }}>
                      <p><span className="font-bold" style={{ color: "#1a2540" }}>Majors: </span>Computer Information Systems (B.S.) · Communication Management (B.A.)</p>
                      <p><span className="font-bold" style={{ color: "#1a2540" }}>Activities: </span>Student Government Association · Interfaith Student Council · Christmas on Campus · Intramural Sports</p>
                      <div>
                        <p className="font-bold mb-1" style={{ color: "#1a2540" }}>Awards &amp; Honors:</p>
                        <ul className="space-y-1 ml-1">
                          {["Honors College", "Dean's List — 2 consecutive semesters", "SGA Member of the Year (2026)", "Spirit of Community Award (2026)", "Board of Trustees Synodality Presentation Member", "Chaminade Scholar"].map((award, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#2563eb", marginTop: 9 }} />{award}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center" style={{ minWidth: 20 }}>
                    <div className="w-4 h-4 rounded-full border-2 shrink-0 mt-1" style={{ borderColor: "#2563eb", backgroundColor: "#f0f4f8" }} />
                  </div>
                  <div className="pb-4 flex-1">
                    <p className="text-[11px] tracking-[0.15em] uppercase mb-1 font-semibold" style={{ color: "#2563eb" }}>Aug 2020 — May 2024</p>
                    <h3 className="text-lg font-bold mb-0.5" style={{ fontFamily: "'Nunito', sans-serif", color: "#1a2540" }}>Lake High School</h3>
                    <p className="text-sm font-semibold mb-5" style={{ color: "#4a6080" }}>High School Diploma</p>
                    <div className="space-y-4 text-sm leading-7" style={{ color: "#4a6080" }}>
                      <p><span className="font-bold" style={{ color: "#1a2540" }}>Activities: </span>Spring Musical · Tennis · Debate Team (Founder)</p>
                      <div>
                        <p className="font-bold mb-1" style={{ color: "#1a2540" }}>Awards &amp; Honors:</p>
                        <ul className="space-y-1 ml-1">
                          {["Outstanding Senior Male Finalist", "National Honor Society — Treasurer & Member", "Choir Spirit Award Winner", "Choir Member of the Year"].map((award, i) => (
                            <li key={i} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#2563eb", marginTop: 9 }} />{award}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INVOLVEMENT */}
      <section id="involvement" style={{ backgroundColor: "#0d1225" }}>
        <div className="px-6 md:px-20 py-24 max-w-6xl mx-auto">
          <Reveal><Heading>Involvement</Heading></Reveal>
          <div className="space-y-28">

            {/* SGA */}
            <Reveal delay={80}>
              <div id="sga" className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div>
                  <InvolvementSlideshow photos={["/sga.jpg", "/sga2.jpg"]} positions={["center 40%", "center"]} />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.25em] uppercase mb-2 font-bold" style={{ color: "#2563eb" }}>UD Student Government Association</p>
                  <h3 className="font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#e8edf8" }}>Director of Marianist Involvement</h3>
                  <div className="space-y-4 text-[15px] leading-8 font-medium" style={{ color: "#9eb0cc" }}>
                    {["🏆 Named 2026 SGA Member of the Year", "In my role, I work to connect students with the University of Dayton's Catholic and Marianist identity and foster interfaith dialogue and understanding across campus.", "I organized and hosted a dinner and dialogue event on Marianist social justice history, bringing together students, faculty, and Marianists.", "Over the course of the year, I built relationships across Campus Ministry, student government, faith communities, and student organizations to strengthen belonging and diversity at UD."].map((p, j) => (
                      <p key={j} style={j === 0 ? { fontWeight: 800, color: "#e8edf8" } : {}}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CARE360 */}
            <Reveal delay={80}>
              <div id="care360" className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="md:order-2">
                  <div className="w-full aspect-[4/3] overflow-hidden" style={{ border: "1px solid #1e2d45" }}>
                    <img src="/care360.jpg" alt="Care360" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style={{ filter: "brightness(0.85)" }} />
                  </div>
                </div>
                <div className="md:order-1">
                  <p className="text-[11px] tracking-[0.25em] uppercase mb-2 font-bold" style={{ color: "#2563eb" }}>Care360 Hospice</p>
                  <h3 className="font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#e8edf8" }}>Legacy Project Volunteer</h3>
                  <div className="space-y-4 text-[15px] leading-8 font-medium" style={{ color: "#9eb0cc" }}>
                    {["I help preserve the life stories of hospice patients by transforming audio recordings, photographs, and personal materials into written narratives for their families.", "These stories are then presented to the hospice patient for approval, and given to the patient's family to help preserve their legacy.", "This work has deepened my appreciation for careful listening and the power of storytelling."].map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  <div className="mt-6">
                    <a
                      href="/care360"
                      className="inline-block text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 font-bold transition-all duration-200"
                      style={{ border: "1px solid #ffffff", color: "#ffffff" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#0d1225"; }}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#ffffff"; }}
                    >
                      View Legacy Project Examples
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* INTERFAITH */}
            <Reveal delay={80}>
              <div id="interfaith" className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div>
                  <InvolvementSlideshow photos={["/interfaith.jpg", "/interfaith2.jpg"]} />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.25em] uppercase mb-2 font-bold" style={{ color: "#2563eb" }}>Leader</p>
                  <h3 className="font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#e8edf8" }}>Interfaith Student Council</h3>
                  <div className="space-y-4 text-[15px] leading-8 font-medium" style={{ color: "#9eb0cc" }}>
                    {["I work alongside students from diverse religious and philosophical backgrounds to foster dialogue, understanding, and genuine inclusion on campus.", "We've collaborated with SGA to launch projects and events that build relationships across different traditions.", "This experience has reinforced my belief that empathy and curiosity are foundational leadership skills."].map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CAMP BLUE */}
            <Reveal delay={80}>
              <div id="camp-blue" className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="md:order-2">
                  <div className="w-full aspect-[4/3] overflow-hidden" style={{ border: "1px solid #1e2d45" }}>
                    <img src="/camp_blue.jpg" alt="Camp Blue" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style={{ filter: "brightness(0.85)" }} />
                  </div>
                </div>
                <div className="md:order-1">
                  <p className="text-[11px] tracking-[0.25em] uppercase mb-2 font-bold" style={{ color: "#2563eb" }}>Student Transitions and Family Programs</p>
                  <h3 className="font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#e8edf8" }}>Camp Counselor</h3>
                  <div className="space-y-4 text-[15px] leading-8 font-medium" style={{ color: "#9eb0cc" }}>
                    {["🏆 Named 2025 Camp Blue Counselor of the Year", "I served as a Blue Crew Counselor during the University of Dayton's Camp Blue orientation experience, mentoring a group of 15 incoming first-year students.", "Alongside fellow counselors, I guided students through a week of leadership activities, team-building exercises, and service projects designed to help them transition into college life.", "This experience deepened my commitment to peer mentorship and reinforced how much the first few days of college can shape a student's sense of belonging."].map((p, j) => (
                      <p key={j} style={j === 0 ? { fontWeight: 800, color: "#e8edf8" } : {}}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* DISNEY */}
            <Reveal delay={80}>
              <div id="disney" className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div>
                  <InvolvementSlideshow photos={["/disney1.jpg", "/disney2.jpg", "/disney3.jpg", "/disney4.jpg"]} positions={["center", "center", "center", "top"]} />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.25em] uppercase mb-2 font-bold" style={{ color: "#2563eb" }}>Walt Disney World</p>
                  <h3 className="font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#e8edf8" }}>Disney Dreamers Academy</h3>
                  <div className="space-y-4 text-[15px] leading-8 font-medium" style={{ color: "#9eb0cc" }}>
                    {["🏆 Selected for competitive Disney Dreamers Academy program", "At Disney Dreamers Academy, I coded and developed new light sequences for MagicBand+ products at interactive touchpoints throughout the park, working alongside Disney engineers and technology teams.", "I also led simulations with Disney executives and coding professionals focused on client interaction skills, gaining insight into how one of the world's most iconic brands uses technology to create memorable guest experiences."].map((p, j) => (
                      <p key={j} style={j === 0 ? { fontWeight: 800, color: "#e8edf8" } : {}}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* HB198 */}
            <Reveal delay={80}>
              <div id="hb198" className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="md:order-2">
                  <InvolvementVideo />
                </div>
                <div className="md:order-1">
                  <p className="text-[11px] tracking-[0.25em] uppercase mb-2 font-bold" style={{ color: "#2563eb" }}>Ohio House of Representatives</p>
                  <h3 className="font-bold mb-6 leading-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#e8edf8" }}>Ohio House Bill 198 Advocate</h3>
                  <div className="space-y-4 text-[15px] leading-8 font-medium" style={{ color: "#9eb0cc" }}>
                    {["Diagnosed with hearing loss as a child, I experienced firsthand how access to a hearing aid transformed my ability to communicate and thrive academically — and have spent years advocating for others facing the same barriers.", "I testified before the Ohio House of Representatives in favor of House Bill 198, which required health insurance to cover hearing aids for individuals twenty-two and under.", "I authored testimonial letters to Ohio government branches and health committees, and shared my story publicly to build awareness around hearing aid insurance coverage gaps.", "Governor DeWine signed a similar bill in January 2023, which is a meaningful milestone in a broader fight to ensure every state requires insurance coverage for hearing aids for children."].map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="px-6 md:px-20 py-24 max-w-6xl mx-auto">
          <Reveal>
            <Heading light>Projects</Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <Reveal delay={0}>
                <div className="flex flex-col h-full p-8" style={{ backgroundColor: "#1a2540" }}>
                  <div className="mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="7" y="4" width="10" height="16" rx="3"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="16" x2="17" y2="16"/><line x1="10" y1="4" x2="14" y2="4"/>
                    </svg>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "#2563eb" }}>Personal Project</p>
                  <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: "#e8edf8", fontFamily: "'Nunito', sans-serif" }}>Can Recycler Machine</h3>
                  <p className="text-sm leading-6 flex-1" style={{ color: "#7a90b8" }}>Collaborated with engineering students to design and build an Arduino-controlled can crusher. Developed C++ code using an ultrasonic sensor to detect, crush, and dispose of cans. Used 3D printing with Bambu Lab for the mechanism and branding.</p>
                  <div className="flex flex-wrap gap-2 mt-5 mb-5">
                    {["Arduino", "C++", "3D Printing"].map(tag => (<span key={tag} className="text-[10px] tracking-[0.1em] px-3 py-1 rounded-full border font-semibold" style={{ borderColor: "#2a3d5a", color: "#7a90b8" }}>{tag}</span>))}
                  </div>
                  <ProjectBtn href="/can-recycler">Project Overview</ProjectBtn>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="flex flex-col h-full p-8" style={{ backgroundColor: "#1a2540" }}>
                  <div className="mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="20" x2="21" y2="20"/><rect x="4" y="14" width="4" height="6" fill="white" stroke="white"/><rect x="10" y="8" width="4" height="12" fill="white" stroke="white"/><rect x="16" y="4" width="4" height="16" fill="white" stroke="white"/>
                    </svg>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "#2563eb" }}>University of Dayton</p>
                  <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: "#e8edf8", fontFamily: "'Nunito', sans-serif" }}>NFL Stats Analysis Program</h3>
                  <p className="text-sm leading-6 flex-1" style={{ color: "#7a90b8" }}>Built a Python program analyzing NFL team performance across 2003–2023 seasons using CSV datasets. Extracted win/loss ratios, touchdowns, and trends with Pandas, and generated visualizations with Matplotlib and Seaborn.</p>
                  <div className="flex flex-wrap gap-2 mt-5 mb-5">
                    {["Python", "Pandas", "Matplotlib"].map(tag => (<span key={tag} className="text-[10px] tracking-[0.1em] px-3 py-1 rounded-full border font-semibold" style={{ borderColor: "#2a3d5a", color: "#7a90b8" }}>{tag}</span>))}
                  </div>
                  <ProjectBtn href="/nfl-stats">Project Overview</ProjectBtn>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="flex flex-col h-full p-8" style={{ backgroundColor: "#1a2540" }}>
                  <div className="mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "#2563eb" }}>Lake High School</p>
                  <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: "#e8edf8", fontFamily: "'Nunito', sans-serif" }}>Matchmaker Program</h3>
                  <p className="text-sm leading-6 flex-1" style={{ color: "#7a90b8" }}>Built a Java program with two modules: an Assessment that determines Myers-Briggs personality type from user preferences, and a Matchmaker that ranks compatibility with previous users on a scoring system out of 100.</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {["Java", "Myers-Briggs", "Algorithms"].map(tag => (<span key={tag} className="text-[10px] tracking-[0.1em] px-3 py-1 rounded-full border font-semibold" style={{ borderColor: "#2a3d5a", color: "#7a90b8" }}>{tag}</span>))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-col h-full p-8 md:col-span-3" style={{ backgroundColor: "#1a2540" }}>
                  <div className="mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                    </svg>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "#2563eb" }}>Personal Project</p>
                  <h3 className="text-xl font-bold mb-3 leading-tight" style={{ color: "#e8edf8", fontFamily: "'Nunito', sans-serif" }}>This Website</h3>
                  <p className="text-sm leading-6 flex-1" style={{ color: "#7a90b8" }}>Designed and built this personal portfolio site from scratch using Next.js, TypeScript, and Tailwind CSS. Features scroll-reveal animations, a typewriter hero, anchor-linked navigation, alternating section layouts, and a fully responsive design.</p>
                  <div className="flex flex-wrap gap-2 mt-5 mb-5">
                    {["Next.js", "TypeScript", "Tailwind CSS", "React"].map(tag => (<span key={tag} className="text-[10px] tracking-[0.1em] px-3 py-1 rounded-full border font-semibold" style={{ borderColor: "#2a3d5a", color: "#7a90b8" }}>{tag}</span>))}
                  </div>
                  <ProjectBtn href="https://github.com/nolanpastore/my-portfolio">View on GitHub</ProjectBtn>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ backgroundColor: "#0d1225" }}>
        <div className="px-6 md:px-20 py-24 max-w-6xl mx-auto">
          <Reveal>
            <Heading>Let's Connect</Heading>
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
              <div>
                <p className="text-[15px] leading-8 font-medium mb-8" style={{ color: "#9eb0cc" }}>I'm open to opportunities in technology strategy, business systems, and cross-functional roles where technology and people intersect.</p>
                <div className="space-y-4">
                  {[["Email", "pastoren1@udayton.edu"], ["LinkedIn", "linkedin.com/in/nolanpastore"]].map(([label, value]) => (
                    <div key={label} className="flex gap-4 text-sm">
                      <span className="text-[10px] tracking-[0.2em] uppercase pt-1 w-20 shrink-0 font-bold" style={{ color: "#2563eb" }}>{label}</span>
                      <span className="font-medium" style={{ color: "#e8edf8" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <form action="https://formsubmit.co/pastoren1@udayton.edu" method="POST" className="space-y-3">
                <input type="hidden" name="_captcha" value="false" />
                {[{ name: "name", placeholder: "Name", type: "text" }, { name: "email", placeholder: "Email", type: "email" }, { name: "subject", placeholder: "Subject", type: "text" }].map((f) => (
                  <input key={f.name} name={f.name} type={f.type} placeholder={f.placeholder} required className="w-full px-5 py-4 text-sm outline-none transition-all duration-200 font-medium" style={{ backgroundColor: "#111827", border: "1px solid #1e2d45", color: "#e8edf8" }} onFocus={e => ((e.target as HTMLInputElement).style.borderColor = "#2563eb")} onBlur={e => ((e.target as HTMLInputElement).style.borderColor = "#1e2d45")} />
                ))}
                <textarea name="message" placeholder="Message" rows={5} required className="w-full px-5 py-4 text-sm outline-none transition-all duration-200 resize-none font-medium" style={{ backgroundColor: "#111827", border: "1px solid #1e2d45", color: "#e8edf8" }} onFocus={e => ((e.target as HTMLTextAreaElement).style.borderColor = "#2563eb")} onBlur={e => ((e.target as HTMLTextAreaElement).style.borderColor = "#1e2d45")} />
                <button type="submit" className="text-[11px] tracking-[0.25em] uppercase px-8 py-4 font-bold transition-all duration-200" style={{ backgroundColor: "#ffffff", color: "#0d1225" }} onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2563eb")} onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ffffff")}>
                  Send Message
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-20 py-8 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase font-bold" style={{ backgroundColor: "#0d1225", borderTop: "1px solid #1e2d45", color: "#2a3d5a" }}>
        <span>Nolan Pastore</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}