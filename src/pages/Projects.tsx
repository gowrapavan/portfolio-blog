import { useState, useEffect } from "react";
// Corrected imports to prevent SyntaxErrors
import { projects } from "../data/projects";
import type { Project } from "../data/projects";

const THEME_BLUE = "#0ea5e9"; // Your home page sky blue
const FONT =
  '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#fff", // Matches your white home page background
    fontFamily: FONT,
    color: "#0f172a",
    paddingBottom: 96,
  },
  header: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "96px 32px 48px",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 100,
    background: "#f0f9ff", // Very light blue tint
    color: THEME_BLUE,
    marginBottom: 24,
    border: `1px solid #e0f2fe`,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  eyebrowDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#22c55e", // Matching your green "Available" dot
    display: "inline-block",
  },
  h1: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1.05,
    margin: "0 0 16px",
    color: "#0f172a",
  },
  headerSub: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.6,
    maxWidth: 520,
    fontWeight: 400,
  },
  divider: {
    maxWidth: 1100,
    margin: "0 auto 40px",
    padding: "0 32px",
  },
  dividerLine: {
    height: 1,
    background: "#f1f5f9",
  },
  filterBar: {
    maxWidth: 1100,
    margin: "0 auto 40px",
    padding: "0 32px",
    display: "flex",
    gap: 10,
    flexWrap: "wrap" as const,
  },
  grid: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 32px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#fff",
    border: "1px solid #f1f5f9",
    borderRadius: 20,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "default",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  cardAccentBar: {
    height: 4,
    transition: "transform 0.35s ease",
    transformOrigin: "left",
  },
  cardBody: {
    padding: "28px",
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
  },
  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logoWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    border: "1px solid #f1f5f9",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  logoFallback: {
    fontSize: 20,
    color: THEME_BLUE,
    fontWeight: 800,
  },
  catBadge: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    padding: "5px 10px",
    borderRadius: 8,
    background: "#f8fafc",
    color: "#64748b",
    whiteSpace: "nowrap" as const,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "#0f172a",
    lineHeight: 1.3,
    margin: "0 0 12px",
  },
  cardDesc: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.6,
    flex: 1,
    margin: "0 0 24px",
  },
  techRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 6,
    marginBottom: 24,
  },
  techPill: {
    fontSize: 11,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 8,
    background: "#f1f5f9",
    color: "#475569",
    letterSpacing: "0.02em",
  },
  cardFooter: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: 20,
    display: "flex",
    gap: 10,
  },
  linkBtn: {
    fontSize: 13,
    fontWeight: 600,
    padding: "8px 18px",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s ease",
    display: "inline-block",
  },
  empty: {
    gridColumn: "1 / -1",
    textAlign: "center" as const,
    padding: "80px 24px",
    color: "#94a3b8",
    fontSize: 14,
  },
  countRow: {
    maxWidth: 1100,
    margin: "0 auto 24px",
    padding: "0 32px",
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
};

// ─── Accent palette (Unified with your theme) ─────────────────────────────────
const ACCENTS = [THEME_BLUE, "#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];

function getAccent(id: number) {
  return ACCENTS[(id - 1) % ACCENTS.length];
}

// ─── Filter Button ───────────────────────────────────────────────────────────────
function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 600,
        padding: "8px 20px",
        borderRadius: 12,
        border: "none",
        background: active ? THEME_BLUE : "#f1f5f9",
        color: active ? "#fff" : "#64748b",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: active ? `0 4px 12px ${THEME_BLUE}44` : "none",
      }}
    >
      {label}
    </button>
  );
}

// ─── Project Card ────────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const accent = getAccent(project.id);

  return (
    <article
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : styles.card.boxShadow,
        borderColor: hovered ? THEME_BLUE : "#f1f5f9",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          ...styles.cardAccentBar,
          background: THEME_BLUE,
          transform: hovered ? "scaleX(1)" : "scaleX(0.0)",
        }}
      />

      <div style={styles.cardBody}>
        <div style={styles.cardTop}>
          <div style={styles.logoWrap}>
            {project.logo && imgOk ? (
              <img
                src={project.logo}
                alt={project.title}
                style={styles.logoImg}
                onError={() => setImgOk(false)}
              />
            ) : (
              <span style={styles.logoFallback}>{project.title.charAt(0)}</span>
            )}
          </div>
          <span style={styles.catBadge}>{project.category}</span>
        </div>

        <h2 style={styles.cardTitle}>{project.title}</h2>
        <p style={styles.cardDesc}>{project.description}</p>

        <div style={styles.techRow}>
          {project.tech.map((t) => (
            <span key={t} style={styles.techPill}>
              {t}
            </span>
          ))}
        </div>

        <div style={styles.cardFooter}>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.linkBtn,
                background: THEME_BLUE,
                color: "#fff",
                boxShadow: `0 4px 10px ${THEME_BLUE}33`,
              }}
            >
              Live ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.linkBtn,
                background: "#fff",
                border: "1px solid #e2e8f0",
                color: "#475569",
              }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const visible = activeFilter === "All" 
    ? projects 
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.eyebrow}>
          <span style={styles.eyebrowDot} />
          Selected work
        </div>
        <h1 style={styles.h1}>
          Featured <span style={{ color: THEME_BLUE }}>Projects</span>
        </h1>
        <p style={styles.headerSub}>
          Full-stack platforms and data-driven solutions built with 
          React, Next.js, and Python.
        </p>
      </header>

      <div style={styles.divider}>
        <div style={styles.dividerLine} />
      </div>

      <div style={styles.filterBar}>
        {categories.map((cat) => (
          <FilterBtn
            key={cat}
            label={cat}
            active={activeFilter === cat}
            onClick={() => setActiveFilter(cat)}
          />
        ))}
      </div>

      <div style={styles.countRow}>
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {activeFilter !== "All" ? ` in ${activeFilter}` : ""}
      </div>

      <main style={styles.grid}>
        {visible.length === 0 ? (
          <div style={styles.empty}>No projects in this category.</div>
        ) : (
          visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </main>
    </div>
  );
}