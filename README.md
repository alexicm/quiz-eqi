# Quiz EQI — Planejamento Financeiro 2026

Quiz interativo de 7 perguntas com ranking ao vivo, construído em Next.js + Supabase.

## Stack

- Next.js 16 (App Router)
- TypeScript + Tailwind CSS
- Supabase (tabela `quiz_scores`)

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha as variáveis do Supabase
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima (pública) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service role (somente servidor) |

## Deploy

Importe o repositório na Vercel, configure as três variáveis de ambiente acima e faça o deploy.
