import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiz EQI — Planejamento Financeiro 2026',
  description: 'Teste seus conhecimentos sobre planejamento financeiro e dispute o ranking ao vivo.',
  openGraph: {
    title: 'Quiz EQI — Planejamento Financeiro 2026',
    description: 'Responda 7 perguntas e veja sua posição no ranking ao vivo!',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={dmSans.className}>{children}</body>
    </html>
  )
}
