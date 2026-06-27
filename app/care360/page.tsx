"use client";

import Link from "next/link";

export default function Care360() {
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
            Volunteer Work · Oct 2025 — Present
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              fontWeight: 400,
              color: "#e8edf8",
              lineHeight: 1.1,
            }}
          >
            Legacy Project Volunteer — Care360 Hospice
          </h1>
          <p className="mt-4 text-sm leading-7 font-medium max-w-3xl" style={{ color: "#7a90b8" }}>
            As a Legacy Project Volunteer, I help preserve the life stories of hospice patients
            for their families. Working alongside Professor Heidi Arnold, I transform audio
            recordings, photographs, and personal materials into written narratives that celebrate
            each patient's experiences and accomplishments. Below are two examples of completed
            legacy documents, shared with permission.
          </p>
        </div>

        {/* Two PDFs side by side */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Legacy 1 */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: "#2563eb" }}>
              Legacy Project — Example 1
            </p>
            <div style={{ border: "1px solid #1e2d45", backgroundColor: "#0a0e1a" }}>
              <iframe
                src="/legacy-1.pdf"
                className="w-full block"
                style={{ height: "600px", border: "none" }}
                title="Legacy Document 1"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <a
                href="/legacy-1.pdf"
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

          {/* Legacy 2 */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: "#2563eb" }}>
              Legacy Project — Example 2
            </p>
            <div style={{ border: "1px solid #1e2d45", backgroundColor: "#0a0e1a" }}>
              <iframe
                src="/legacy-2.pdf"
                className="w-full block"
                style={{ height: "600px", border: "none" }}
                title="Legacy Document 2"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <a
                href="/legacy-2.pdf"
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