const signals = [
  { cx: 10, cy: 85, r: 0.9, opacity: 0.3, fill: "#22D3EE" },
  { cx: 18, cy: 70, r: 0.6, opacity: 0.22, fill: "#94A3B8" },
  { cx: 6, cy: 60, r: 0.7, opacity: 0.26, fill: "#6D5CE8" },
  { cx: 22, cy: 88, r: 0.5, opacity: 0.18, fill: "#94A3B8" },
  { cx: 30, cy: 75, r: 0.8, opacity: 0.28, fill: "#22D3EE" },
  { cx: 15, cy: 45, r: 0.5, opacity: 0.2, fill: "#6D5CE8" },
  { cx: 38, cy: 60, r: 0.6, opacity: 0.22, fill: "#94A3B8" },
  { cx: 45, cy: 40, r: 0.7, opacity: 0.28, fill: "#22D3EE" },
  { cx: 55, cy: 50, r: 0.5, opacity: 0.18, fill: "#94A3B8" },
  { cx: 60, cy: 30, r: 0.6, opacity: 0.24, fill: "#6D5CE8" },
  { cx: 70, cy: 45, r: 0.5, opacity: 0.16, fill: "#94A3B8" },
  { cx: 100, cy: 55, r: 0.5, opacity: 0.14, fill: "#6D5CE8" },
  { cx: 108, cy: 75, r: 0.4, opacity: 0.12, fill: "#94A3B8" },
] as const;

const networkLines = [
  "M 10 85 L 18 70",
  "M 18 70 L 30 75",
  "M 6 60 L 15 45",
  "M 38 60 L 45 40",
  "M 55 50 L 60 30",
] as const;

const beams = [
  { d: "M 45 40 C 60 32, 75 24, 94 26", delay: "0s" },
  { d: "M 60 30 C 72 26, 82 24, 94 26", delay: "-2s" },
  { d: "M 30 75 C 55 65, 75 45, 94 26", delay: "-4s" },
] as const;

const growthBars = [
  { x: 6, height: 6 },
  { x: 10, height: 10 },
  { x: 14, height: 16 },
  { x: 18, height: 22 },
] as const;

/**
 * Composição original: sinais de mercado dispersos (muitos, ténues) que
 * convergem, ao longo de feixes com o gradiente da marca, para um único
 * nó de oportunidade em destaque. Um motivo discreto de barras
 * ascendentes (canto inferior esquerdo) ecoa o elemento gráfico da
 * logótipo sem o reproduzir. Puramente ilustrativo — sem dados reais.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-sm lg:max-w-none" aria-hidden="true">
      <svg viewBox="0 0 120 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="heroFlowGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#6D5CE8" />
          </linearGradient>
        </defs>

        {networkLines.map((d) => (
          <path key={d} d={d} stroke="#334155" strokeWidth="0.25" opacity="0.4" />
        ))}

        {signals.map((signal) => (
          <circle
            key={`${signal.cx}-${signal.cy}`}
            cx={signal.cx}
            cy={signal.cy}
            r={signal.r}
            fill={signal.fill}
            opacity={signal.opacity}
          />
        ))}

        {beams.map((beam) => (
          <path
            key={beam.d}
            d={beam.d}
            fill="none"
            stroke="url(#heroFlowGradient)"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray="2.5 4"
            opacity="0.55"
            className="animate-hero-flow"
            style={{ animationDelay: beam.delay }}
          />
        ))}

        <g opacity="0.3">
          {growthBars.map((bar) => (
            <rect
              key={bar.x}
              x={bar.x}
              y={92 - bar.height}
              width="2"
              height={bar.height}
              rx="0.4"
              fill="url(#heroFlowGradient)"
            />
          ))}
        </g>
      </svg>

      <div
        className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-2xl"
        style={{ left: "78.3%", top: "26%" }}
      />
      <div
        className="animate-hero-pulse absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,#22D3EE,#6D5CE8)]"
        style={{ left: "78.3%", top: "26%" }}
      />
    </div>
  );
}
