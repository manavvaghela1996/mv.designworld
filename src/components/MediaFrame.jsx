import { useState } from "react";

function Pattern({ index }) {
  const variant = Number(index) % 8 || 8;
  const common = "absolute inset-0 h-full w-full";

  if (variant === 1) {
    return (
      <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(255,255,255,0.35)" strokeWidth="0.3" />
        <line x1="18" y1="100" x2="100" y2="22" stroke="rgba(255,255,255,0.18)" strokeWidth="0.3" />
        <rect x="72" y="12" width="14" height="14" fill="var(--accent)" />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle cx="78" cy="28" r="18" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.4" />
        <circle cx="78" cy="28" r="8" fill="var(--accent)" />
        <path d="M0 78 H100" stroke="rgba(255,255,255,0.25)" strokeWidth="0.3" />
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="8" y="0" width="0.4" height="100" fill="rgba(255,255,255,0.25)" />
        <rect x="28" y="0" width="0.4" height="100" fill="rgba(255,255,255,0.18)" />
        <rect x="62" y="0" width="8" height="100" fill="var(--accent)" />
        <rect x="84" y="0" width="0.4" height="100" fill="rgba(255,255,255,0.25)" />
      </svg>
    );
  }

  if (variant === 4) {
    return (
      <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.28)" strokeWidth="0.35" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.28)" strokeWidth="0.35" />
        <rect x="46" y="46" width="8" height="8" fill="var(--accent)" />
      </svg>
    );
  }

  if (variant === 5) {
    return (
      <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="0" width="42" height="100" fill="rgba(255,255,255,0.04)" />
        <rect x="58" y="18" width="28" height="18" fill="var(--accent)" />
        <rect x="58" y="42" width="28" height="40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.4" />
      </svg>
    );
  }

  if (variant === 6) {
    return (
      <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-10 90 Q 50 10 110 70" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        <path d="M-10 100 Q 50 30 110 86" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
      </svg>
    );
  }

  if (variant === 7) {
    return (
      <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 8 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={8 + col * 12}
              cy={10 + row * 16}
              r="0.6"
              fill="rgba(255,255,255,0.45)"
            />
          )),
        )}
        <rect x="8" y="70" width="22" height="8" fill="var(--accent)" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.35" />
      <line x1="20" y1="0" x2="100" y2="80" stroke="rgba(255,255,255,0.16)" strokeWidth="0.35" />
      <rect x="12" y="12" width="10" height="36" fill="var(--accent)" />
    </svg>
  );
}

function Plate({ index, label, pathNote, portrait }) {
  return (
    <div className="absolute inset-0 bg-[#161616] text-[#f5f5f3]" aria-hidden="true">
      <Pattern index={portrait ? 2 : index || 1} />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-5xl leading-none tracking-tight sm:text-7xl">
            {portrait ? "MV" : index || "01"}
          </span>
          <span className="mt-2 h-2.5 w-2.5 bg-accent" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">
            {portrait ? "Portrait" : "Placeholder"}
          </p>
          <p className="mt-2 max-w-[14ch] font-display text-2xl uppercase leading-[0.95] sm:text-4xl">
            {portrait ? "Manav Vaghela" : label}
          </p>
          <p className="mt-3 max-w-xs text-[11px] leading-relaxed text-white/55">
            {portrait
              ? "Place the portrait at public/assets/manav-profile.png"
              : `Place the image at public${pathNote || ""}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MediaFrame({
  src,
  alt,
  label = "Project",
  index = "01",
  pathNote = "",
  portrait = false,
  priority = false,
  className = "",
}) {
  const [status, setStatus] = useState(src ? "loading" : "missing");
  const showPlate = status !== "loaded";
  const unnamed = status === "error" || status === "missing";

  return (
    <div
      className={`relative overflow-hidden bg-[#161616] ${className}`}
      role={unnamed ? "img" : undefined}
      aria-label={unnamed ? alt : undefined}
    >
      {showPlate ? (
        <Plate index={index} label={label} pathNote={pathNote || src} portrait={portrait} />
      ) : null}
      {src && status !== "missing" && status !== "error" ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          draggable="false"
          className={`absolute inset-0 h-full w-full object-cover ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
}
