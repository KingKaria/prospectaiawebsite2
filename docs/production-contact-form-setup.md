# Configuração de produção do formulário de contacto

Este documento descreve os passos manuais necessários para ativar em
produção o envio real de email (Brevo) e o rate limiting persistente
(Upstash Redis) do formulário de contacto. Nenhum destes passos foi
executado por mim — todos requerem login em contas de terceiros (Brevo,
Upstash, Vercel), que só o responsável pelo projeto pode fazer.

Nenhuma chave, token ou segredo real deve alguma vez ser escrito neste
ficheiro, no `.env.example`, em testes, em logs, ou em qualquer ficheiro
versionado no Git. Os valores reais vivem exclusivamente em `.env.local`
(nunca commitado — ver `.gitignore`) e nas variáveis de ambiente da Vercel.

## Variáveis de ambiente necessárias

Estes são os 7 nomes exatos lidos pelo código (confirmados por inspeção
direta do código-fonte, não assumidos):

| Variável | Ficheiro que a lê | Propósito |
|---|---|---|
| `BREVO_API_KEY` | `lib/email/send-contact-message.ts` | Autenticação com a API Transactional do Brevo |
| `CONTACT_EMAIL_FROM` | `lib/email/send-contact-message.ts` | Email do remetente (controlado pelo servidor) |
| `CONTACT_EMAIL_FROM_NAME` | `lib/email/send-contact-message.ts` | Nome de exibição do remetente |
| `CONTACT_EMAIL_TO` | `lib/email/send-contact-message.ts` | Destinatário do email (controlado pelo servidor) |
| `UPSTASH_REDIS_REST_URL` | `lib/rate-limit/check-rate-limit.ts` | Endpoint REST do Upstash Redis |
| `UPSTASH_REDIS_REST_TOKEN` | `lib/rate-limit/check-rate-limit.ts` | Token de autenticação do Upstash Redis |
| `CONTACT_RATE_LIMIT_SECRET` | `app/contacto/actions.ts` | Segredo HMAC-SHA-256 para pseudonimizar o IP |

Valores de configuração já decididos e aprovados:
- Remetente: email `contacto@mail.prospectaia.pt`, nome `ProspectAIA` —
  subdomínio dedicado ao envio, isolado do domínio principal.
- Destinatário: `contacto@prospectaia.pt` — endereço público de receção,
  no domínio principal.

## Passo 1 — Brevo

1. Cria uma conta em [brevo.com](https://www.brevo.com) (ação manual, não
   automatizável a partir daqui).
2. No dashboard do Brevo, vai a **Senders, Domains & Dedicated IPs →
   Domains** e adiciona `mail.prospectaia.pt` (o subdomínio, não
   `prospectaia.pt`).
3. O Brevo mostra um conjunto de registos DNS para autenticação —
   tipicamente registos `TXT` (SPF/verificação, DKIM) e por vezes um
   `CNAME` — segue exatamente o que o dashboard mostrar.
4. Adiciona esses registos na Zona DNS da Hostinger, para o subdomínio
   `mail` (não no domínio raiz `@`). **Este passo não foi feito por mim**
   — o DNS não foi alterado nesta fase.
5. Espera a verificação do domínio no dashboard do Brevo.
6. Adiciona também o endereço `contacto@mail.prospectaia.pt` em
   **Senders** (remetente autorizado a enviar).
7. Cria uma API Key em **Settings → API Keys → Generate a new API key**.
   Copia o valor — só é mostrado uma vez.

## Passo 2 — Upstash Redis

1. Cria uma conta em [upstash.com](https://upstash.com) (ação manual).
2. Cria uma nova base de dados Redis (**Create Database**). Sugestão:
   escolhe uma região próxima de onde o site é servido (ex. `eu-west-1`
   ou equivalente europeu), para minimizar latência — não é obrigatório
   para o funcionamento correto, só para desempenho.
3. No painel da base de dados, na secção **REST API**, copia:
   - `UPSTASH_REDIS_REST_URL`;
   - `UPSTASH_REDIS_REST_TOKEN`.

## Passo 3 — Gerar `CONTACT_RATE_LIMIT_SECRET`

Gera um valor aleatório longo, só localmente, no teu próprio terminal —
nunca peças a ninguém para o gerar por ti e nunca o partilhes.

**PowerShell** (testado nesta sessão, compatível com Windows PowerShell 5.1):

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
-join ($bytes | ForEach-Object { $_.ToString("x2") })
```

Isto produz uma string hexadecimal de 64 caracteres. Copia o resultado —
é o valor de `CONTACT_RATE_LIMIT_SECRET`. Gera um valor novo; não reutilizes
nenhum exemplo que apareça em qualquer documentação ou conversa.

Alternativa em Bash/Git Bash, se preferires:

```bash
openssl rand -hex 32
```

## Passo 4 — Configurar as variáveis

### Localmente (para testar antes do deploy)

1. Copia `.env.example` para `.env.local` (na raiz do projeto):
   ```
   cp .env.example .env.local
   ```
2. Substitui os 7 valores ilustrativos pelos valores reais obtidos nos
   passos 1-3.
3. `.env.local` **nunca** é commitado — já está coberto pela regra
   `.env*` no `.gitignore` (confirmado nesta sessão).

### Na Vercel (produção)

1. No projeto `prospectaiawebsite2` → **Settings → Environment Variables**.
2. Adiciona as mesmas 7 variáveis, uma a uma, com os valores reais.
3. Aplica-as ao ambiente **Production** (e a **Preview**/**Development**
   se quiseres testar em deployments de pré-visualização).
4. Depois de guardar todas, é necessário um **novo deployment** para as
   variáveis terem efeito (a Vercel não aplica variáveis de ambiente a
   deployments já existentes — só a partir daí, faz um "Redeploy" ou
   um novo push ao `main`).

## Passo 5 — Validar sem enviar nada real

Antes de qualquer envio real:
1. Corre `npm run build` localmente com `.env.local` preenchido, para
   confirmar que a aplicação arranca sem erros de configuração.
2. Usa os testes automatizados existentes (`npx vitest run`) — já cobrem
   os cenários de configuração em falta, erro do Brevo, erro do Upstash,
   fail-open, etc., todos com mocks, sem tocar em serviços reais.
3. Só depois de confirmares que queres mesmo testar um envio real,
   pede confirmação explícita antes de submeteres o formulário em
   produção com as credenciais reais ativas — este documento não
   autoriza esse passo por si só.

## O que este documento não cobre (fora de âmbito)

- Criação de contas Brevo/Upstash — só o responsável pelo projeto pode
  fazer login e criar essas contas.
- Alteração de registos DNS — mencionada como passo necessário, mas não
  executada a partir daqui.
- Geração ou inserção de chaves/segredos reais.
- Qualquer envio real de email de teste.
