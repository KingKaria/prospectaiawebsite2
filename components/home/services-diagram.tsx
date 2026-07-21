const acquisitionX = [30, 70, 110, 150];
const optimizationX = [80, 120];
const neckX = 100;
const neckY = 72;

/**
 * Mostra a estrutura real dos serviços, não decora: 4 nós (serviços de
 * aquisição) convergem para um ponto de transição e daí divergem para 2
 * nós (serviços de otimização) — a mesma agrupação usada na lista ao
 * lado. Puramente ilustrativo; a explicação em texto não depende dele.
 */
export function ServicesDiagram() {
  return (
    <svg viewBox="0 0 200 150" className="h-auto w-full max-w-[240px]" aria-hidden="true">
      <defs>
        <linearGradient id="servicesFlowGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#6D5CE8" />
        </linearGradient>
      </defs>

      <line
        x1="15"
        y1={neckY}
        x2="185"
        y2={neckY}
        stroke="#1E293B"
        strokeWidth="0.5"
        strokeDasharray="2 3"
      />

      {acquisitionX.map((x) => (
        <path
          key={`in-${x}`}
          d={`M${x},14 Q${(x + neckX) / 2},${neckY - 22} ${neckX},${neckY}`}
          fill="none"
          stroke="url(#servicesFlowGradient)"
          strokeWidth="1"
          opacity="0.55"
        />
      ))}

      {optimizationX.map((x) => (
        <path
          key={`out-${x}`}
          d={`M${neckX},${neckY} Q${(x + neckX) / 2},${neckY + 30} ${x},134`}
          fill="none"
          stroke="url(#servicesFlowGradient)"
          strokeWidth="1.4"
        />
      ))}

      {acquisitionX.map((x) => (
        <circle key={`node-in-${x}`} cx={x} cy="14" r="3" fill="#22D3EE" />
      ))}
      {optimizationX.map((x) => (
        <circle key={`node-out-${x}`} cx={x} cy="134" r="4" fill="#6D5CE8" />
      ))}
    </svg>
  );
}
