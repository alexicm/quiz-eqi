export type Question = {
  category: string
  text: string
  options: string[]
  correct: number
  feedback: string
}

export type RankingEntry = {
  position: number
  name: string
  score: number
  total: number
}

export type Screen = 'intro' | 'question' | 'result' | 'ranking'
