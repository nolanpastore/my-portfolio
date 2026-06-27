"use client";

import Link from "next/link";

export default function NFLStats() {
  return (
    <main style={{ backgroundColor: "#0d1225", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Back link */}
      <div className="px-6 md:px-20 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-bold transition-colors duration-200"
          style={{ color: "#2563eb" }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10l5-5M5 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Portfolio
        </Link>
      </div>

      <div className="px-6 md:px-20 py-12 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3" style={{ color: "#2563eb" }}>
            University of Dayton · 2024
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              color: "#e8edf8",
              lineHeight: 1.1,
            }}
          >
            NFL Stats Analysis Program
          </h1>
          <p className="mt-4 text-sm leading-7 font-medium max-w-3xl" style={{ color: "#7a90b8" }}>
            Collaborated with a partner on a Python program that analyzes NFL team performance using CSV datasets.
            Extracted key statistics from 2003–2023 seasons including win/loss ratios and overall touchdowns using Pandas,
            and generated team-specific and league-wide performance graphs using Matplotlib and Seaborn.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Python", "Pandas", "Matplotlib", "Seaborn", "CSV Analysis"].map(tag => (
              <span key={tag} className="text-[10px] tracking-[0.1em] px-3 py-1 rounded-full border font-semibold" style={{ borderColor: "#1e2d45", color: "#7a90b8" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Side by side */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT — Video */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: "#2563eb" }}>
              Program Demo
            </p>
            <div style={{ border: "1px solid #1e2d45", backgroundColor: "#0a0e1a" }}>
              <video
                controls
                className="w-full block"
                style={{ maxHeight: "520px", objectFit: "contain" }}
              >
                <source src="/nfl-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* RIGHT — PDF Slideshow */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: "#2563eb" }}>
              Presentation
            </p>
            <div style={{ border: "1px solid #1e2d45", backgroundColor: "#0a0e1a" }}>
              <iframe
                src="/nfl-slides.pdf"
                className="w-full block"
                style={{ height: "520px", border: "none" }}
                title="NFL Stats Presentation"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <a
                href="/nfl-slides.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 font-bold transition-all duration-200"
                style={{ border: "1px solid #2563eb", color: "#2563eb" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#2563eb"; e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#2563eb"; }}
              >
                Open Full Screen
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}