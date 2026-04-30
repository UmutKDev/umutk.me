export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base — subtle warm wash on top of black */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(216,133,106,0.16),transparent_60%),radial-gradient(80%_60%_at_92%_100%,rgba(201,100,66,0.10),transparent_60%),radial-gradient(60%_40%_at_8%_88%,rgba(232,200,150,0.06),transparent_70%)]" />

      {/* deep grid */}
      <div className="absolute inset-0 grid-fx mask-fade-edges opacity-70" />

      {/* fine grid */}
      <div className="absolute inset-0 grid-fx-fine opacity-40 mask-fade-edges" />

      {/* drifting blob 1 (coral) */}
      <div
        className="absolute -top-40 -left-40 h-[55vmax] w-[55vmax] rounded-full anim-float-slow"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(216,133,106,0.32), transparent 60%)",
          filter: "blur(70px)",
        }}
      />
      {/* drifting blob 2 (warm amber) */}
      <div
        className="absolute -bottom-60 -right-40 h-[60vmax] w-[60vmax] rounded-full anim-drift"
        style={{
          background:
            "radial-gradient(circle at 60% 60%, rgba(201,100,66,0.22), transparent 60%)",
          filter: "blur(90px)",
        }}
      />
      {/* drifting blob 3 (cream) */}
      <div
        className="absolute top-1/3 left-1/3 h-[35vmax] w-[35vmax] rounded-full anim-float-slow"
        style={{
          animationDelay: "-8s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(232,200,150,0.10), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* horizontal scan line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/55 to-transparent anim-scan-y opacity-30" />

      {/* deep vignette + noise */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_50%,rgba(0,0,0,0.65)_100%)]" />
      <div className="absolute inset-0 noise" />
    </div>
  );
}
