"use client";

import Link from "next/link";

const letters = [
  {
    name: "Dan Harold",
    title: "Principal",
    org: "Lake High School",
    file: "/rec-dan-harold.pdf",
    relationship: "High School Principal",
  },
  // Add more here as you get them:
  // {
  //   name: "Jane Smith",
  //   title: "Director",
  //   org: "Some Organization",
  //   file: "/rec-jane-smith.pdf",
  //   relationship: "Supervisor",
  // },
];

export default function Recommendations() {
  return (
    <main style={{ backgroundColor: "#0d1225", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Rhodium+Libre&display=swap');
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

      <div className="px-6 md:px-20 py-16 max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-bold mb-3" style={{ color: "#2563eb" }}>
            References
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
            Letters of Recommendation
          </h1>
          <p className="mt-4 text-sm leading-7 font-medium max-w-2xl" style={{ color: "#7a90b8" }}>
            The following letters have been written on my behalf by mentors and leaders
            who can speak to my character, work ethic, and contributions.
          </p>
        </div>

        {/* Letter cards */}
        <div className="space-y-5">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-8"
              style={{ backgroundColor: "#111827", border: "1px solid #1e2d45" }}
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: "#2563eb" }}>
                  {letter.relationship}
                </p>
                <h2 className="text-xl font-bold mb-1" style={{ color: "#e8edf8", fontFamily: "'Nunito', sans-serif" }}>
                  {letter.name}
                </h2>
                <p className="text-sm font-medium" style={{ color: "#7a90b8" }}>
                  {letter.title} · {letter.org}
                </p>
              </div>
              <a
                href={letter.file}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-[10px] tracking-[0.2em] uppercase px-6 py-3 font-bold transition-all duration-200 shrink-0 text-center"
                style={{ border: "1px solid #2563eb", color: "#2563eb" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "#2563eb"; e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#2563eb"; }}
              >
                View Letter
              </a>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}