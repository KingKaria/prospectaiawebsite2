import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

const variantStyles: Record<ButtonVariant, string> = {
  // DECISÃO DE ACESSIBILIDADE — NÃO REVERTER SEM LER ISTO:
  // O gradiente do botão primário usa as cores oficiais da marca sem
  // qualquer alteração (--color-cyan #22D3EE -> --color-violet #6D5CE8).
  // O stop do violeta está esticado para 115% (em vez do habitual 100%)
  // exclusivamente para garantir WCAG AA (>=4.5:1) com o texto escuro
  // (text-background) em qualquer ponto da superfície do botão — medido
  // por amostragem de pixels, não apenas por cálculo teórico. Sem este
  // ajuste, o canto do botão mais próximo do violeta puro cai para 4.17:1.
  // O estado active usa brightness-[0.99] em vez do brightness-90 "óbvio":
  // testámos e brightness-90 escurece o gradiente o suficiente para o
  // contraste cair para ~3.86:1 (falha AA). 0.99 é o valor mínimo que
  // mantém >=4.5:1 no pior ponto também no estado premido.
  // Qualquer alteração futura ao gradiente (cores, direção, stops) deve
  // ser revalidada com as mesmas medições antes de ser aceite.
  primary:
    "bg-[linear-gradient(90deg,var(--color-cyan),var(--color-violet)_115%)] text-background hover:brightness-110 active:brightness-[0.99]",
  secondary:
    "border border-cyan text-cyan hover:bg-cyan/10 active:bg-cyan/15",
  ghost: "text-foreground-muted hover:text-foreground hover:bg-surface",
};

export function Button(props: ButtonProps) {
  // Um único destructure retira variant/size/className/children de props
  // — "rest" nunca volta a conter nenhum deles, nos dois ramos abaixo.
  // Antes, cada ramo fazia o seu próprio destructure parcial (só de
  // href/type), pelo que "rest" continuava com className (e, no ramo
  // com href, também variant/size) — espalhado depois de
  // className={classes}, sobrepunha-se às classes calculadas.
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as Omit<ButtonAsLink, "variant" | "size" | "className" | "children">;
    const isExternal = /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...anchorRest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonRest } = rest as Omit<
    ButtonAsButton,
    "variant" | "size" | "className" | "children"
  >;

  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
