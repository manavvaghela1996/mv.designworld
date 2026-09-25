export default function SectionLabel({ index, children, tone = "default" }) {
  const ink = tone === "inverse" ? "text-current" : "text-ink";
  const muted = tone === "inverse" ? "text-current/70" : "text-muted";

  return (
    <p className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] ${muted}`}>
      {index ? <span className={ink}>{index}</span> : null}
      <span className={`h-px w-8 ${tone === "inverse" ? "bg-current/50" : "bg-ink/30"}`} />
      <span>{children}</span>
    </p>
  );
}
