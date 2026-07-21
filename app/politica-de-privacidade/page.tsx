import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";
import { Link } from "@/components/ui/link";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidade",
  description: "Como a ProspectAIA recolhe, utiliza e protege os dados pessoais dos visitantes e clientes.",
  path: "/politica-de-privacidade",
});

const sections: LegalSection[] = [
  {
    id: "quem-somos",
    title: "1. Quem somos e âmbito desta política",
    content: (
      <>
        <p>
          Esta política de privacidade explica como a {siteConfig.name}, com sede em
          [morada da sede a confirmar], pessoa coletiva número [NIPC a confirmar]
          (&ldquo;{siteConfig.name}&rdquo;, &ldquo;nós&rdquo;), recolhe, utiliza e protege os dados
          pessoais das pessoas que visitam este website ou que connosco contactam.
        </p>
        <p>
          Aplica-se a todos os dados pessoais tratados através do website{" "}
          <Link href={siteConfig.url}>{siteConfig.url}</Link>, incluindo os submetidos
          através de formulários de contacto ou de outros meios de comunicação
          disponibilizados no site.
        </p>
      </>
    ),
  },
  {
    id: "dados-recolhidos",
    title: "2. Que dados pessoais recolhemos",
    content: (
      <>
        <p>Recolhemos apenas os dados que nos fornece diretamente, nomeadamente:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Nome;</li>
          <li>Endereço de email;</li>
          <li>Nome da empresa (quando aplicável);</li>
          <li>Número de telefone (quando fornecido voluntariamente);</li>
          <li>Conteúdo da mensagem enviada através do formulário de contacto.</li>
        </ul>
        <p>
          Não recolhemos categorias especiais de dados pessoais (por exemplo, dados de
          saúde, origem racial ou étnica, ou convicções religiosas) e pedimos que não
          nos envie esse tipo de informação através dos nossos formulários.
        </p>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "3. Para que finalidades usamos os seus dados",
    content: (
      <>
        <p>Utilizamos os dados pessoais recolhidos para:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Responder a pedidos de contacto e de diagnóstico comercial;</li>
          <li>Prestar os serviços solicitados, caso venha a tornar-se cliente;</li>
          <li>Enviar comunicações relacionadas com um pedido em curso;</li>
          <li>Cumprir obrigações legais e contabilísticas quando aplicável.</li>
        </ul>
        <p>
          Não utilizamos os seus dados para decisões automatizadas com efeitos
          jurídicos ou similarmente significativos.
        </p>
      </>
    ),
  },
  {
    id: "base-legal",
    title: "4. Base legal do tratamento",
    content: (
      <p>
        Tratamos os seus dados com base na execução de diligências pré-contratuais a
        seu pedido (artigo 6.º, n.º 1, alínea b) do RGPD) quando preenche o formulário
        de contacto, e no nosso interesse legítimo em responder de forma eficiente a
        pedidos de informação (artigo 6.º, n.º 1, alínea f) do RGPD). Quando a lei o
        exigir, pediremos o seu consentimento explícito antes de qualquer outro
        tratamento.
      </p>
    ),
  },
  {
    id: "partilha",
    title: "5. Com quem partilhamos os seus dados",
    content: (
      <>
        <p>
          Não vendemos nem alugamos os seus dados pessoais a terceiros. Os seus dados
          podem ser partilhados apenas com:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Prestadores de serviços que apoiam o funcionamento do website (por
            exemplo, alojamento e infraestrutura técnica), sujeitos a obrigações de
            confidencialidade;
          </li>
          <li>Autoridades públicas, quando exigido por lei.</li>
        </ul>
        <p>
          Esta lista será atualizada caso venhamos a integrar novas ferramentas (por
          exemplo, de análise de tráfego ou de gestão de contactos comerciais).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies e tecnologias semelhantes",
    content: (
      <p>
        O website utiliza cookies de forma limitada. Os detalhes sobre que cookies
        utilizamos, para que servem e como os pode gerir estão descritos na nossa{" "}
        <Link href="/cookies">Política de Cookies</Link>.
      </p>
    ),
  },
  {
    id: "conservacao",
    title: "7. Prazo de conservação dos dados",
    content: (
      <p>
        Conservamos os dados recolhidos através do formulário de contacto pelo tempo
        necessário para responder ao seu pedido e, caso se torne cliente, durante a
        relação comercial e pelo prazo adicional exigido por obrigações legais e
        fiscais aplicáveis. Após esse período, os dados são eliminados ou anonimizados
        de forma segura.
      </p>
    ),
  },
  {
    id: "seguranca",
    title: "8. Como protegemos os seus dados",
    content: (
      <p>
        Adotamos medidas técnicas e organizativas adequadas para proteger os dados
        pessoais contra acesso não autorizado, perda ou alteração, proporcionais à
        natureza dos dados tratados. Nenhum sistema é totalmente imune a riscos, pelo
        que, em caso de incidente de segurança com impacto nos seus dados,
        cumpriremos os deveres de notificação previstos no RGPD.
      </p>
    ),
  },
  {
    id: "direitos",
    title: "9. Os seus direitos",
    content: (
      <>
        <p>Ao abrigo do RGPD, tem o direito de:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Aceder aos dados pessoais que temos sobre si;</li>
          <li>Solicitar a retificação de dados incorretos ou incompletos;</li>
          <li>Solicitar o apagamento dos seus dados, quando aplicável;</li>
          <li>Solicitar a limitação ou opor-se ao tratamento;</li>
          <li>Solicitar a portabilidade dos dados que nos forneceu;</li>
          <li>Retirar o consentimento a qualquer momento, quando este seja a base do tratamento.</li>
        </ul>
        <p>
          Para exercer qualquer um destes direitos, contacte-nos através dos dados
          indicados na secção &ldquo;Como nos contactar&rdquo;. Tem também o direito de
          apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD),
          a autoridade de controlo em Portugal.
        </p>
      </>
    ),
  },
  {
    id: "transferencias",
    title: "10. Transferências internacionais",
    content: (
      <p>
        Sempre que um prestador de serviços utilizado esteja localizado fora do
        Espaço Económico Europeu, asseguraremos que a transferência de dados é feita
        ao abrigo de um mecanismo legal adequado (como cláusulas contratuais-tipo
        aprovadas pela Comissão Europeia).
      </p>
    ),
  },
  {
    id: "menores",
    title: "11. Dados de menores",
    content: (
      <p>
        Este website destina-se a públicos empresariais e não é dirigido a menores de
        idade. Não recolhemos intencionalmente dados pessoais de menores de 18 anos.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "12. Alterações a esta política",
    content: (
      <p>
        Podemos atualizar esta política periodicamente para refletir alterações
        legais, técnicas ou na forma como tratamos dados pessoais. A data da última
        atualização está indicada no topo desta página. Recomendamos a consulta
        periódica desta página.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "13. Como nos contactar",
    content: (
      <p>
        Para qualquer questão relacionada com esta política ou com o tratamento dos
        seus dados pessoais, contacte-nos através de{" "}
        <Link href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</Link>.
      </p>
    ),
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalDocument
      title="Política de privacidade"
      lastUpdated="[data a confirmar antes da publicação]"
      intro={
        <p>
          A sua privacidade é importante para nós. Este documento é um modelo
          estruturado, preparado para revisão por um jurista antes de entrar em vigor
          — os campos entre parênteses retos identificam informação que ainda precisa
          de ser confirmada (morada, número de identificação fiscal e data de
          publicação).
        </p>
      }
      sections={sections}
    />
  );
}
