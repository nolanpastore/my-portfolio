"use client";

import { useState } from "react";
import Link from "next/link";

export default function CanRecycler() {
  const [current, setCurrent] = useState(0);
  const photos = [
    { src: "/can-recycler-1.jpg", caption: "Initial Sketch" },
    { src: "/can-recycler-2.jpg", caption: "Design Overview" },
    { src: "/can-recycler-3.jpg", caption: "Final Product" },
  ];

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
            Personal Project · 2024–2025
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
            Can Recycler Machine
          </h1>
          <p className="mt-4 text-sm leading-7 font-medium max-w-3xl" style={{ color: "#7a90b8" }}>
            Collaborated with engineering students to design and build an Arduino-controlled can crusher.
            Developed C++ code using an ultrasonic sensor to detect, crush, and dispose of cans.
            Used 3D printing with Bambu Lab for the mechanism, can guidance system, and branding.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Arduino", "C++", "3D Printing", "Bambu Lab", "Ultrasonic Sensor"].map(tag => (
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
              Video Demo
            </p>
            <div style={{ border: "1px solid #1e2d45", backgroundColor: "#0a0e1a" }}>
              <video
                controls
                className="w-full block"
                style={{ maxHeight: "520px", objectFit: "contain" }}
              >
                <source src="/can-recycler-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* RIGHT — Slideshow */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: "#2563eb" }}>
              Development Photos
            </p>

            {/* Main photo */}
            <div className="relative" style={{ border: "1px solid #1e2d45", backgroundColor: "#0a0e1a" }}>
              <img
                src={photos[current].src}
                alt={photos[current].caption}
                className="w-full block"
                style={{ maxHeight: "520px", objectFit: "contain" }}
              />

              {/* Arrows */}
              <button
                onClick={() => setCurrent(c => (c === 0 ? photos.length - 1 : c - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 transition-all duration-200"
                style={{ backgroundColor: "rgba(13,18,37,0.8)", border: "1px solid #1e2d45", color: "#e8edf8" }}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setCurrent(c => (c === photos.length - 1 ? 0 : c + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 transition-all duration-200"
                style={{ backgroundColor: "rgba(13,18,37,0.8)", border: "1px solid #1e2d45", color: "#e8edf8" }}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M7 15l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Caption + counter */}
            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-sm font-semibold" style={{ color: "#7a90b8" }}>
                {photos[current].caption}
              </p>
              <p className="text-[11px] tracking-[0.15em] uppercase font-semibold" style={{ color: "#2a3d5a" }}>
                {current + 1} / {photos.length}
              </p>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-3">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="flex-1 overflow-hidden transition-all duration-200"
                  style={{
                    border: i === current ? "2px solid #2563eb" : "1px solid #1e2d45",
                    opacity: i === current ? 1 : 0.45,
                    backgroundColor: "#0a0e1a",
                  }}
                >
                  <img src={photo.src} alt={photo.caption} className="w-full block" style={{ height: "60px", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}