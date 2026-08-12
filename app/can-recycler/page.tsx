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
    <main
      style={{
        backgroundColor: "#0d1225",
        minHeight: "100vh",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div className="px-6 md:px-20 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-bold transition-colors duration-200"
          style={{ color: "#2563eb" }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 10H5M5 10l5-5M5 10l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      <div className="px-6 md:px-20 py-12 max-w-6xl mx-auto">
        <div className="mb-12">
          <p
            className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3"
            style={{ color: "#2563eb" }}
          >
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

          <p
            className="mt-4 text-sm leading-7 font-medium max-w-3xl"
            style={{ color: "#7a90b8" }}
          >
            Collaborated with engineering students to design and build an
            Arduino-controlled can crusher. Developed C++ code using an
            ultrasonic sensor to detect, crush, and dispose of cans. Used 3D
            printing with Bambu Lab for the mechanism, can guidance system,
            and branding.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {["Arduino", "C++", "3D Printing", "Bambu Lab", "Ultrasonic Sensor"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.1em] px-3 py-1 rounded-full border font-semibold"
                  style={{ borderColor: "#1e2d45", color: "#7a90b8" }}
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* GitHub button */}
          <div className="mt-10">
            <a
              href="https://github.com/nolanpastore/can-recycler-machine"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 font-bold transition-all duration-200"
              style={{ border: "1px solid #2563eb", color: "#2563eb" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2563eb";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p
              className="text-[11px] tracking-[0.25em] uppercase font-bold mb-4"
              style={{ color: "#2563eb" }}
            >
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

          <div>
            <p
              className="text-[11px] tracking-[0.25em] uppercase font-bold mb-4"
              style={{ color: "#2563eb" }}
            >
              Development Photos
            </p>

            <div
              className="relative"
              style={{ border: "1px solid #1e2d45", backgroundColor: "#0a0e1a" }}
            >
              <img
                src={photos[current].src}
                alt={photos[current].caption}
                className="w-full block"
                style={{ maxHeight: "520px", objectFit: "contain" }}
              />

              <button
                onClick={() =>
                  setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9"
                style={{
                  backgroundColor: "rgba(13,18,37,0.8)",
                  border: "1px solid #1e2d45",
                  color: "#e8edf8",
                }}
              >
                ←
              </button>

              <button
                onClick={() =>
                  setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9"
                style={{
                  backgroundColor: "rgba(13,18,37,0.8)",
                  border: "1px solid #1e2d45",
                  color: "#e8edf8",
                }}
              >
                →
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-sm font-semibold" style={{ color: "#7a90b8" }}>
                {photos[current].caption}
              </p>
              <p
                className="text-[11px] tracking-[0.15em] uppercase font-semibold"
                style={{ color: "#2a3d5a" }}
              >
                {current + 1} / {photos.length}
              </p>
            </div>

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
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full block"
                    style={{ height: "60px", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}