const systemNodes = [20, 140, 260, 380];
const decisionNode = 480;

/**
 * Espinha de 5 nós, não um funil: os 4 primeiros (dados → sinais →
 * inferências → prioridade) ligam-se por uma linha contínua com
 * gradiente de marca — o pipeline automatizado. O 5º nó (decisão
 * humana) liga-se por uma linha tracejada e fica sem preenchimento,
 * marcando visualmente que deixa de ser um passo do sistema. Os
 * rótulos vivem em HTML ao lado, não no SVG — este diagrama é só o
 * reforço visual da rutura entre análise e decisão.
 */
export function EvaluationDiagram() {
  return (
    <svg viewBox="0 0 500 40" className="h-auto w-full max-w-md" aria-hidden="true">
      <defs>
        <linearGradient id="evaluationSpineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      <line
        x1={systemNodes[0]}
        y1="20"
        x2={systemNodes[systemNodes.length - 1]}
        y2="20"
        stroke="url(#evaluationSpineGradient)"
        strokeWidth="1.5"
      />
      <line
        x1={systemNodes[systemNodes.length - 1]}
        y1="20"
        x2={decisionNode}
        y2="20"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        strokeDasharray="3 4"
        opacity="0.6"
      />

      {systemNodes.map((x, index) => (
        <circle
          key={x}
          cx={x}
          cy="20"
          r="5"
          fill={index < 2 ? "#22D3EE" : "#8B5CF6"}
        />
      ))}

      <circle cx={decisionNode} cy="20" r="7" fill="none" stroke="#8B5CF6" strokeWidth="2" />
    </svg>
  );
}
