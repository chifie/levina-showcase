export default function OrbitRing() {
  return (
    <>
      <div
        className="absolute -inset-5 rounded-full animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(13,59,102,0.5) 55deg, transparent 140deg, rgba(74,108,158,0.4) 220deg, transparent 300deg, rgba(13,59,102,0.45) 360deg)",
          animationDuration: "14s",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -inset-10 rounded-full border border-dashed border-brand/20 animate-spin-slow"
        style={{ animationDirection: "reverse", animationDuration: "40s" }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/70 shadow-glow" />
        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light/70" />
        <span className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-dark/50" />
        <span className="absolute left-1/2 bottom-0 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand/40" />
      </div>
    </>
  );
}
