'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { questions } from '@/lib/questions'
import type { Screen, RankingEntry } from '@/types'

const LETTERS = ['A', 'B', 'C', 'D']
const MEDALS = ['🥇', '🥈', '🥉']
const TOTAL = questions.length

export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [playerName, setPlayerName] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [rankingLoading, setRankingLoading] = useState(false)
  const [rankingError, setRankingError] = useState('')
  const [saving, setSaving] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const question = questions[currentQ]

  const fetchRanking = useCallback(async () => {
    setRankingLoading(true)
    setRankingError('')
    try {
      const res = await fetch('/api/scores')
      if (!res.ok) throw new Error('Erro ao carregar ranking')
      const data = await res.json()
      setRanking(data)
    } catch {
      setRankingError('Não foi possível carregar o ranking. Tente novamente.')
    } finally {
      setRankingLoading(false)
    }
  }, [])

  useEffect(() => {
    if (screen === 'ranking') {
      fetchRanking()
      intervalRef.current = setInterval(fetchRanking, 10000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [screen, fetchRanking])

  function startQuiz() {
    if (playerName.trim().length < 2) return
    setCurrentQ(0)
    setScore(0)
    setAnswered(false)
    setSelectedIdx(null)
    setScreen('question')
  }

  function pickAnswer(idx: number) {
    if (answered) return
    setAnswered(true)
    setSelectedIdx(idx)
    if (idx === question.correct) {
      setScore(prev => prev + 1)
    }
  }

  async function nextQuestion() {
    if (currentQ + 1 < TOTAL) {
      setCurrentQ(prev => prev + 1)
      setAnswered(false)
      setSelectedIdx(null)
    } else {
      setSaving(true)
      try {
        const finalScore = selectedIdx === question.correct ? score + 1 : score
        await fetch('/api/scores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: playerName.trim(), score: finalScore, total: TOTAL })
        })
      } catch {}
      setSaving(false)
      setScreen('result')
    }
  }

  function getResultMessage() {
    const finalScore = answered && selectedIdx === question.correct ? score + 1 : score
    if (finalScore === TOTAL) return { title: 'Perfeito! Expert financeiro 🏆', text: 'Você acertou tudo! Domínio completo sobre planejamento financeiro e sucessório.' }
    if (finalScore >= 5) return { title: 'Muito bem!', text: `${finalScore} de ${TOTAL} acertos. Ótimo conhecimento — ainda há espaço para aprofundar com seu assessor.` }
    if (finalScore >= 3) return { title: 'Bom começo!', text: `${finalScore} de ${TOTAL} acertos. O planejamento tem muito a oferecer — a EQI pode te ajudar nessa jornada.` }
    return { title: 'Hora de planejar!', text: `${finalScore} de ${TOTAL} acertos. É exatamente por isso que estamos aqui. Vamos conversar sobre seu planejamento!` }
  }

  function getFinalScore() {
    return answered && selectedIdx === question.correct ? score + 1 : score
  }

  function restartQuiz() {
    setScreen('intro')
    setCurrentQ(0)
    setScore(0)
    setAnswered(false)
    setSelectedIdx(null)
  }

  function getOptionClass(idx: number) {
    if (!answered) return 'bg-white border border-gray-200 hover:border-[#2DC88A] hover:bg-green-50 cursor-pointer transition-all duration-150 hover:translate-x-1'
    if (idx === question.correct) return 'bg-[#E8FAF3] border border-[#1A6B50] cursor-default'
    if (idx === selectedIdx && idx !== question.correct) return 'bg-red-50 border border-red-300 cursor-default'
    return 'bg-white border border-gray-200 opacity-50 cursor-default'
  }

  function getLetterClass(idx: number) {
    if (!answered) return 'bg-gray-100 text-gray-500'
    if (idx === question.correct) return 'bg-[#1A6B50] text-white'
    if (idx === selectedIdx && idx !== question.correct) return 'bg-red-400 text-white'
    return 'bg-gray-100 text-gray-400'
  }

  const progressPct = (currentQ / TOTAL) * 100

  return (
    <div className="min-h-screen bg-[#0A3D2E] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-white font-semibold text-xl tracking-tight">
            EQ<span className="text-[#2DC88A]">I</span>
          </div>
          <div className="flex items-center gap-3">
            {screen === 'question' && (
              <>
                <span className="text-[#2DC88A] text-xs font-medium">{currentQ}/{TOTAL}</span>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2DC88A] rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </>
            )}
            <span className="text-white/40 text-xs">Planejamento em Foco · 2026</span>
          </div>
        </div>

        {/* ── INTRO ── */}
        {screen === 'intro' && (
          <div className="bg-[#F5F2EC] rounded-2xl p-8 md:p-12 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <div className="inline-block bg-[#0A3D2E] text-[#2DC88A] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              Quiz ao vivo
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#0A3D2E] leading-tight mb-3">
              Quanto você sabe sobre<br />
              <span className="italic text-[#1A6B50]">planejamento financeiro?</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Responda 7 perguntas baseadas na apresentação de hoje e dispute o ranking ao vivo com os outros participantes.
            </p>
            <div className="flex gap-3 justify-center mb-8 flex-wrap">
              {[['7', 'perguntas'], ['Ranking', 'ao vivo'], ['~5', 'minutos']].map(([val, label]) => (
                <div key={label} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm">
                  <span className="font-semibold text-[#0A3D2E]">{val}</span>
                  <span className="text-gray-400 ml-1">{label}</span>
                </div>
              ))}
            </div>
            <div className="max-w-xs mx-auto mb-5">
              <label className="block text-sm text-gray-500 text-left mb-1.5">Seu nome para o ranking</label>
              <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && startQuiz()}
                placeholder="Ex: Maria Silva"
                maxLength={40}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-[#0A3D2E] outline-none focus:border-[#1A6B50] focus:ring-2 focus:ring-[#1A6B50]/20 transition-all"
              />
            </div>
            <button
              onClick={startQuiz}
              disabled={playerName.trim().length < 2}
              className="bg-[#0A3D2E] text-white px-10 py-3.5 rounded-xl font-medium text-sm hover:bg-[#1A6B50] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Começar o Quiz →
            </button>
          </div>
        )}

        {/* ── QUESTION ── */}
        {screen === 'question' && (
          <div className="bg-[#F5F2EC] rounded-2xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#0A3D2E] text-[#2DC88A] text-xs font-semibold px-3 py-1 rounded-lg">
                Q {currentQ + 1}
              </span>
              <span className="text-gray-400 text-xs uppercase tracking-wider">{question.category}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-[#0A3D2E] leading-snug mb-6">
              {question.text}
            </h2>

            <div className="space-y-3 mb-4">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => pickAnswer(idx)}
                  disabled={answered}
                  className={`w-full rounded-xl px-4 py-3.5 text-left text-sm flex items-center gap-3 ${getOptionClass(idx)}`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all ${getLetterClass(idx)}`}>
                    {LETTERS[idx]}
                  </span>
                  <span className="text-[#0A3D2E]">{opt}</span>
                </button>
              ))}
            </div>

            {answered && (
              <div className={`p-4 rounded-xl text-sm leading-relaxed mb-4 border-l-4 ${selectedIdx === question.correct ? 'bg-[#E8FAF3] border-[#1A6B50] text-[#0A3D2E]' : 'bg-red-50 border-red-400 text-red-800'}`}>
                <strong className="block mb-1 font-semibold">
                  {selectedIdx === question.correct ? '✓ Correto!' : '✗ Não foi dessa vez.'}
                </strong>
                {question.feedback}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-400">
                Pontos: <strong className="text-[#0A3D2E] font-semibold">{score}</strong>
              </span>
              {answered && (
                <button
                  onClick={nextQuestion}
                  disabled={saving}
                  className="bg-[#0A3D2E] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1A6B50] transition-colors disabled:opacity-60"
                >
                  {saving ? 'Salvando…' : currentQ + 1 < TOTAL ? 'Próxima →' : 'Ver resultado →'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {screen === 'result' && (
          <div className="bg-[#F5F2EC] rounded-2xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-[#0A3D2E] flex flex-col items-center justify-center mx-auto mb-6">
              <span className="text-white font-semibold text-3xl leading-none">{getFinalScore()}</span>
              <span className="text-[#2DC88A] text-xs mt-0.5">de {TOTAL}</span>
            </div>
            <h2 className="text-2xl font-semibold text-[#0A3D2E] mb-2">{getResultMessage().title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              {getResultMessage().text}
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'perguntas', val: TOTAL, color: 'text-[#0A3D2E]' },
                { label: 'corretas', val: getFinalScore(), color: 'text-[#1A6B50]' },
                { label: 'erradas', val: TOTAL - getFinalScore(), color: 'text-red-500' }
              ].map(({ label, val, color }) => (
                <div key={label} className="bg-white rounded-xl p-4">
                  <div className={`text-2xl font-semibold ${color}`}>{val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setScreen('ranking')}
                className="border border-gray-300 bg-white text-[#0A3D2E] px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                🏆 Ver ranking
              </button>
              <button
                onClick={restartQuiz}
                className="bg-[#0A3D2E] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1A6B50] transition-colors"
              >
                ↺ Jogar de novo
              </button>
            </div>
          </div>
        )}

        {/* ── RANKING ── */}
        {screen === 'ranking' && (
          <div className="bg-[#F5F2EC] rounded-2xl p-6 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#0A3D2E]">🏆 Ranking ao vivo</h2>
              <button
                onClick={fetchRanking}
                disabled={rankingLoading}
                className="text-xs border border-gray-300 bg-white text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {rankingLoading ? '↻ Atualizando…' : '↻ Atualizar'}
              </button>
            </div>

            {rankingError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl mb-4">
                {rankingError}
              </div>
            )}

            {rankingLoading && ranking.length === 0 && (
              <div className="text-center text-gray-400 text-sm py-10">Carregando ranking…</div>
            )}

            {!rankingLoading && ranking.length === 0 && !rankingError && (
              <div className="text-center text-gray-400 text-sm py-10">
                Nenhuma resposta ainda. Seja o primeiro!
              </div>
            )}

            <div className="space-y-2.5 mb-6">
              {ranking.map((entry) => {
                const isMe = entry.name.toLowerCase() === playerName.toLowerCase().trim()
                const initials = entry.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
                const medal = entry.position <= 3 ? MEDALS[entry.position - 1] : null
                return (
                  <div
                    key={entry.position}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                      isMe
                        ? 'bg-[#E8FAF3] border-[#1A6B50]'
                        : entry.position === 1
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="text-lg min-w-[28px] text-center">
                      {medal ?? <span className="text-sm text-gray-400 font-medium">{entry.position}</span>}
                    </div>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      entry.position === 1 ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#0A3D2E] truncate">
                        {entry.name}
                        {isMe && <span className="ml-2 text-[10px] font-normal text-[#1A6B50] bg-[#C8F0DF] px-2 py-0.5 rounded-full">você</span>}
                      </div>
                      <div className="text-xs text-gray-400">{entry.score} de {entry.total} acertos</div>
                    </div>
                    <div className="text-lg font-semibold text-[#0A3D2E] flex-shrink-0">
                      {entry.score}<span className="text-xs font-normal text-gray-400">/{entry.total}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setScreen('result')}
                className="border border-gray-300 bg-white text-[#0A3D2E] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                ← Meu resultado
              </button>
              <button
                onClick={restartQuiz}
                className="bg-[#0A3D2E] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#1A6B50] transition-colors"
              >
                ↺ Jogar de novo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
