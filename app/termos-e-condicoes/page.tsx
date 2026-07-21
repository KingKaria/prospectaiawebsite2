import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";
import { Link } from "@/components/ui/link";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Termos e condições",
  description: "Termos e condições de utilização do website da ProspectAIA.",
  path: "/termos-e-condicoes",
});

const sections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "1. Aceitação dos termos",
    content: (
      <p>
        Ao aceder e utilizar este website, concorda com os presentes Termos e
        Condições. Se não concordar com algum destes termos, deve interromper a
        utilização do website.
      </p>
    ),
  },
  {
    id: "definicoes",
    title: "2. Definições",
    content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>&ldquo;Website&rdquo; refere-se ao site acessível em {siteConfig.url};</li>
        <li>&ldquo;{siteConfig.name}&rdquo;, &ldquo;nós&rdquo; refere-se à entidade responsável pelo website;</li>
        <li>&ldquo;Utilizador&rdquo;, &ldquo;visitante&rdquo; refere-se a qualquer pessoa que aceda ao website;</li>
        <li>&ldquo;Serviços&rdquo; refere-se aos serviços de marketing digital e prospeção comercial descritos no website.</li>
      </ul>
    ),
  },
  {
    id: "servicos",
    title: "3. Descrição dos serviços",
    content: (
      <p>
        O website apresenta informação institucional sobre os serviços de marketing
        digital e prospeção comercial prestados pela {siteConfig.name}. A informação
        disponibilizada tem caráter meramente informativo e não constitui uma
        proposta contratual vinculativa — a prestação efetiva de serviços fica sujeita
        a um contrato específico a celebrar entre as partes.
      </p>
    ),
  },
  {
    id: "utilizacao",
    title: "4. Regras de utilização do website",
    content: (
      <>
        <p>Ao utilizar este website, compromete-se a não:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Utilizar o website para fins ilegais ou não autorizados;</li>
          <li>Tentar aceder de forma não autorizada a sistemas ou dados do website;</li>
          <li>Introduzir vírus, malware ou outro código malicioso;</li>
          <li>Extrair ou reutilizar conteúdos do website de forma automatizada sem autorização prévia.</li>
        </ul>
      </>
    ),
  },
  {
    id: "propriedade-intelectual",
    title: "5. Propriedade intelectual",
    content: (
      <p>
        Todo o conteúdo do website — incluindo textos, logótipo, identidade visual,
        gráficos e código — é propriedade da {siteConfig.name} ou dos seus licenciantes,
        e está protegido por legislação de propriedade intelectual. Não é permitida a
        reprodução, distribuição ou utilização comercial destes conteúdos sem
        autorização prévia por escrito.
      </p>
    ),
  },
  {
    id: "formularios",
    title: "6. Formulários e comunicações",
    content: (
      <p>
        Ao submeter um formulário de contacto, garante que a informação fornecida é
        verdadeira e exata. Reservamo-nos o direito de não responder a pedidos que
        considerarmos abusivos, fraudulentos ou fora do âmbito dos nossos serviços.
      </p>
    ),
  },
  {
    id: "links-terceiros",
    title: "7. Ligações para sites de terceiros",
    content: (
      <p>
        Este website pode conter ligações para sites de terceiros (por exemplo,
        WhatsApp). Não somos responsáveis pelo conteúdo, políticas de privacidade ou
        práticas desses sites, e a inclusão de uma ligação não implica endosso do seu
        conteúdo.
      </p>
    ),
  },
  {
    id: "limitacao-responsabilidade",
    title: "8. Limitação de responsabilidade",
    content: (
      <p>
        Na máxima medida permitida por lei, a {siteConfig.name} não será responsável por
        danos indiretos, incidentais ou consequenciais resultantes do uso ou da
        impossibilidade de uso deste website. Nada nestes termos exclui
        responsabilidade que não possa ser legalmente excluída.
      </p>
    ),
  },
  {
    id: "isencao-garantias",
    title: "9. Isenção de garantias",
    content: (
      <p>
        O website é disponibilizado &ldquo;tal como está&rdquo;, sem garantias de qualquer
        tipo, expressas ou implícitas, quanto à sua disponibilidade contínua,
        ausência de erros ou adequação a um propósito específico.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "10. Alterações a estes termos",
    content: (
      <p>
        Podemos atualizar estes Termos e Condições periodicamente. As alterações
        entram em vigor a partir da data de publicação no website. A utilização
        continuada do website após uma alteração constitui aceitação dos novos
        termos.
      </p>
    ),
  },
  {
    id: "lei-aplicavel",
    title: "11. Lei aplicável e foro competente",
    content: (
      <p>
        Estes Termos e Condições são regidos pela lei portuguesa. Para a resolução de
        qualquer litígio emergente da utilização deste website, é competente o foro
        da comarca [a confirmar], com renúncia expressa a qualquer outro.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "12. Contacto",
    content: (
      <p>
        Para questões relacionadas com estes Termos e Condições, contacte-nos através
        de <Link href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</Link>.
      </p>
    ),
  },
];

export default function TermosECondicoesPage() {
  return (
    <LegalDocument
      title="Termos e condições"
      lastUpdated="[data a confirmar antes da publicação]"
      intro={
        <p>
          Estes Termos e Condições regulam o acesso e a utilização deste website.
          Este documento é um modelo estruturado, preparado para revisão jurídica
          antes de entrar em vigor — o foro competente indicado na secção 11 fica
          sujeito a confirmação.
        </p>
      }
      sections={sections}
    />
  );
}
