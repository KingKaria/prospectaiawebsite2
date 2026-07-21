import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { EvaluationDiagram } from "@/components/home/evaluation-diagram";

const layers = [
  {
    number: "01",
    name: "Dados observados",
    definition: "Factos recolhidos diretamente, sem interpretação: o que existe e pode ser verificado.",
    criteria: "Presença digital · Sinais de atividade · Dimensão e contexto",
  },
  {
    number: "02",
    name: "Sinais identificados",
    definition: "Padrões que emergem dos dados — indicam algo, mas ainda não explicam nada.",
    criteria: "Posicionamento · Qualidade dos dados disponíveis",
  },
  {
    number: "03",
    name: "Inferências explicadas",
    definition: "A nossa leitura dos sinais — sempre identificada como interpretação, nunca como facto.",
    criteria: "Maturidade comercial · Nível de confiança da análise",
  },
  {
    number: "04",
    name: "Prioridade sugerida",
    definition: "Uma recomendação de ordem, não uma classificação definitiva.",
    criteria: "Prioridade comercial",
  },
];

/**
 * Substitui as antigas secções de resultados e prova social. Composição
 * deliberadamente distinta das restantes: coluna única centrada (não o
 * 2 colunas de Serviços), lista vertical de camadas com número + critérios
 * inline (não a sequência horizontal 01/02/03 da Proposta de Valor, nem
 * a grelha de cartões de Diferenciação/Soluções). A camada 5 — decisão
 * humana — fica fora da lista numerada e sem critérios, para não parecer
 * mais uma "funcionalidade" do sistema.
 */
export function EvaluationSection() {
  return (
    <section className="border-b border-border py-24">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading
          align="center"
          eyebrow="Como avaliamos"
          title="Como avaliamos uma oportunidade comercial"
          description="Cada oportunidade passa pelo mesmo processo antes de chegar à sua equipa comercial: não uma lista de empresas, mas uma leitura estruturada do que sabemos sobre cada uma — e do que ainda não sabemos."
        />

        <EvaluationDiagram />

        <div className="flex w-full max-w-2xl flex-col divide-y divide-border border-t border-border">
          {layers.map((layer) => (
            <div key={layer.number} className="flex flex-col gap-1.5 py-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-cyan">{layer.number}</span>
                <h3 className="text-base font-medium text-foreground">{layer.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground-muted">{layer.definition}</p>
              <p className="text-xs text-foreground-muted">{layer.criteria}</p>
            </div>
          ))}

          <div className="flex flex-col gap-1.5 border-t-2 border-violet-accent py-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-violet-accent">05</span>
              <h3 className="text-base font-medium text-foreground">Decisão humana</h3>
            </div>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Continua sempre com a sua equipa comercial. Nenhuma oportunidade avança sem essa decisão.
            </p>
          </div>
        </div>

        <p className="max-w-xl text-center text-sm leading-relaxed text-foreground-muted">
          É esta distinção — entre o que observamos, o que inferimos e o que decide — que torna o
          processo mais útil do que receber apenas uma lista de empresas.
        </p>

        <Link
          href="/servicos"
          className="inline-flex items-center gap-1.5 py-1.5 text-sm font-medium"
        >
          Ver como aplicamos isto nos serviços
          <Icon icon={ArrowRight} size={16} />
        </Link>
      </Container>
    </section>
  );
}
