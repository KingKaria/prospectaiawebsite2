import type { NextConfig } from "next";

// Só 'self' na generalidade das diretivas: o site não carrega scripts,
// estilos, fontes ou imagens de nenhum domínio externo — as fontes
// (next/font/google) são auto-alojadas no build, sem pedidos a
// fonts.googleapis.com/fonts.gstatic.com em runtime (confirmado no HTML
// gerado), e não há analytics, CDN nem outro recurso de terceiros.
//
// 'unsafe-inline' em script-src é necessário porque o Next.js App Router
// injeta o payload de hidratação (streaming RSC) em <script> inline sem
// nonce (self.__next_f.push(...)) — confirmado empiricamente nesta sessão:
// sem 'unsafe-inline', esses scripts são bloqueados pelo CSP e a
// hidratação falha por completo (document.body fica sem __reactFiber),
// mesmo sem nenhum erro visível na consola desta ferramenta de teste.
// Uma CSP baseada em nonce (via middleware.ts, conforme a documentação
// oficial do Next.js) eliminaria a necessidade de 'unsafe-inline' aqui,
// mas introduz uma peça de arquitetura nova (middleware) fora do âmbito
// desta correção — fica registado como melhoria futura.
//
// 'unsafe-inline' em style-src é necessário porque vários componentes
// (ex. mobile-navigation.tsx, whatsapp-button.tsx) usam o atributo
// style={{...}} do React, que o CSP trata como estilo inline — removê-lo
// exigiria reescrever esses componentes para classes CSS, fora do âmbito
// desta correção. Em desenvolvimento, script-src também precisa de
// 'unsafe-eval' (Fast Refresh do Next.js).
const isDev = process.env.NODE_ENV !== "production";

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'" + (isDev ? " ws:" : ""),
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
];
if (!isDev) cspDirectives.push("upgrade-insecure-requests");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
