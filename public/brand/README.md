# Ficheiros da marca

Coloca aqui os ficheiros oficiais da logótipo quando estiverem disponíveis:

- `logo.svg` ou `logo.png` — versão horizontal principal (fundo escuro)
- `logo-light.svg` / `logo-light.png` — versão para fundos claros (se aplicável)
- `logo-mark.svg` — apenas o símbolo "P", sem o texto (para espaços pequenos)
- `favicon.ico` / `icon.svg` — ícone do separador do navegador

Depois de adicionares o ficheiro principal, atualiza
`components/brand/logo.tsx` para usar `next/image` em vez do wordmark de
texto provisório atualmente em uso. Ver comentário `TODO` nesse ficheiro.
