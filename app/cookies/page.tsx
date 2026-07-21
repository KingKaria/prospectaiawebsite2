import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/legal/legal-document";
import { Link } from "@/components/ui/link";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies",
  description: "Que cookies o website da ProspectAIA utiliza e como os pode gerir.",
  path: "/cookies",
});

const sections: LegalSection[] = [
  {
    id: "o-que-sao",
    title: "1. O que são cookies",
    content: (
      <p>
        Cookies são pequenos ficheiros de texto guardados no seu dispositivo quando
        visita um website. Permitem que o site funcione corretamente e, em alguns
        casos, recolham informação sobre a forma como o site é utilizado.
      </p>
    ),
  },
  {
    id: "como-usamos",
    title: "2. Como utilizamos cookies neste site",
    content: (
      <p>
        Neste momento, este website utiliza apenas cookies estritamente necessários
        ao seu funcionamento técnico (por exemplo, para lembrar preferências básicas
        de navegação). <strong className="text-foreground">Não utilizamos, atualmente, cookies
        de análise de tráfego, publicidade ou redes sociais.</strong> Caso isso venha a
        mudar — por exemplo, com a introdução de ferramentas de análise de audiência —
        esta política será atualizada antes dessa alteração entrar em vigor, e será
        pedido o seu consentimento quando exigido por lei.
      </p>
    ),
  },
  {
    id: "tipos",
    title: "3. Tipos de cookies",
    content: (
      <>
        <p>Para efeitos desta política, distinguimos os seguintes tipos de cookies:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Estritamente necessários</strong> — essenciais
            para o funcionamento básico do website. Não podem ser desativados sem
            afetar o funcionamento do site.
          </li>
          <li>
            <strong className="text-foreground">Desempenho e análise</strong> — ajudariam a
            perceber como os visitantes utilizam o website. Não estão atualmente em
            uso neste site.
          </li>
          <li>
            <strong className="text-foreground">Funcionalidade</strong> — permitiriam
            lembrar escolhas do utilizador (por exemplo, idioma). Não estão
            atualmente em uso neste site.
          </li>
          <li>
            <strong className="text-foreground">Marketing e publicidade</strong> —
            utilizados para apresentar publicidade relevante. Não estão em uso neste
            site.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gestao",
    title: "4. Como gerir ou desativar cookies",
    content: (
      <>
        <p>
          A generalidade dos browsers permite gerir e eliminar cookies através das
          respetivas definições. Pode normalmente encontrar essas opções nos menus de
          &ldquo;Definições&rdquo; ou &ldquo;Privacidade&rdquo; do seu browser.
        </p>
        <p>
          Note que bloquear cookies estritamente necessários pode afetar o
          funcionamento correto de algumas partes do website.
        </p>
      </>
    ),
  },
  {
    id: "terceiros",
    title: "5. Cookies de terceiros",
    content: (
      <p>
        O website inclui uma ligação direta para o WhatsApp (através do botão
        flutuante de contacto), que abre numa nova aba fora do nosso domínio. Essa
        ligação não define cookies no nosso site — quaisquer cookies definidos após
        clicar nessa ligação são geridos pelo WhatsApp/Meta, de acordo com as suas
        próprias políticas.
      </p>
    ),
  },
  {
    id: "alteracoes",
    title: "6. Alterações a esta política",
    content: (
      <p>
        Esta política de cookies pode ser atualizada sempre que a utilização de
        cookies no website mudar. A data da última atualização está indicada no topo
        desta página.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "7. Contacto",
    content: (
      <p>
        Para questões relacionadas com esta política, contacte-nos através de{" "}
        <Link href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</Link>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Política de cookies"
      lastUpdated="[data a confirmar antes da publicação]"
      intro={
        <p>
          Esta página explica, de forma transparente, que cookies este website
          utiliza atualmente e como os pode gerir. Este documento é um modelo
          estruturado, preparado para revisão jurídica antes de entrar em vigor.
        </p>
      }
      sections={sections}
    />
  );
}
