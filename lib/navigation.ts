export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Contacto", href: "/contacto" },
];

export const footerLegalNav: NavItem[] = [
  { label: "Política de privacidade", href: "/politica-de-privacidade" },
  { label: "Termos e condições", href: "/termos-e-condicoes" },
];
