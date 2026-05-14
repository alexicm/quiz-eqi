import type { Question } from '@/types'

export const questions: Question[] = [
  {
    category: "Contexto de mercado",
    text: "Quantas novas mulheres passaram a investir na Bolsa em 2025, de acordo com dados da B3 apresentados hoje?",
    options: ["Cerca de 15 mil", "Mais de 100 mil", "Quase 55 mil", "Aproximadamente 30 mil"],
    correct: 2,
    feedback: "Quase 55 mil novas mulheres passaram a investir na Bolsa em 2025, representando um crescimento de +4% na presença feminina na B3. (Fonte: CNN Brasil / B3)"
  },
  {
    category: "Fundamentos",
    text: "O que é Planejamento Financeiro, segundo a apresentação?",
    options: [
      "Uma estratégia para especular na bolsa",
      "Uma ferramenta para garantir ao investidor o atingimento dos objetivos por ele traçados",
      "Um produto exclusivo para quem tem muito patrimônio",
      "Um produto financeiro vendido por bancos"
    ],
    correct: 1,
    feedback: "Planejamento Financeiro é uma ferramenta para garantir ao investidor o atingimento dos objetivos por ele traçados, usando Renda Fixa, Renda Variável, Criptoativos e Alocação Internacional."
  },
  {
    category: "Planejamento sucessório",
    text: "Num patrimônio de R$ 10 milhões com ITCMD máximo + advogado + cartório, qual seria o custo total de inventário?",
    options: ["R$ 800.000", "R$ 1.600.000", "R$ 2.000.000", "R$ 500.000"],
    correct: 1,
    feedback: "ITCMD 8% + advogado 6% + cartório 2% = 16% sobre R$ 10M = R$ 1.600.000 de custo total de inventário."
  },
  {
    category: "Reforma tributária",
    text: "Qual é a faixa de alíquota progressiva do ITCMD no Brasil após a Reforma Tributária?",
    options: ["Alíquota fixa de 8%", "De 0% a 5%", "De 2% a 8%", "De 10% a 25%"],
    correct: 2,
    feedback: "O ITCMD passou a ter alíquota progressiva de 2% a 8% sobre o valor a mercado do patrimônio móvel e imóvel — um dos pontos centrais da Reforma Tributária."
  },
  {
    category: "Ferramentas sucessórias",
    text: "Quais são as principais ferramentas de Planejamento Sucessório mencionadas na apresentação?",
    options: [
      "Tesouro Direto, CDB e Ações",
      "Holding, offshore, previdência privada, seguro de vida e doação em vida",
      "Poupança, FIIs e debêntures",
      "Apenas testamento e inventário judicial"
    ],
    correct: 1,
    feedback: "Holding, Investimentos Internacionais (offshore), Previdência Privada, Seguro de vida e Doação em vida — cada uma com papel estratégico na transmissão eficiente de patrimônio."
  },
  {
    category: "Benefícios do planejamento",
    text: "Qual destes NÃO é um benefício do Planejamento Financeiro apresentado hoje?",
    options: [
      "Reserva de emergência — parar de depender da sorte",
      "Liberdade de escolha — mais opções na vida profissional",
      "Garantia de retorno de 20% ao ano em qualquer cenário",
      "Objetivos saem do papel — seus sonhos viram uma data"
    ],
    correct: 2,
    feedback: "Não existe garantia de retorno fixo. Os benefícios reais incluem controle, clareza, reserva de emergência, liberdade de escolha e aposentadoria no momento que você quiser."
  },
  {
    category: "Exemplo prático",
    text: "No exemplo da Ana (45 anos, aposentadoria aos 60, renda desejada de R$ 15.000/mês): qual é o patrimônio financeiro atual dela?",
    options: ["R$ 500.000", "R$ 2.158.225", "R$ 1.074.696", "R$ 3.861.807"],
    correct: 2,
    feedback: "Ana possui R$ 1.074.696 de patrimônio atual. Para viver de renda precisaria acumular R$ 3.861.807, com poupança mensal de R$ 6.551,30."
  }
]
