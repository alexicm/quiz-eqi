'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function EntrarPage() {
  const [quizUrl, setQuizUrl] = useState('')

  useEffect(() => {
    setQuizUrl(window.location.origin + '/')
  }, [])

  return (
    <div className="min-h-screen bg-[#0A3D2E] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-white font-semibold text-xl tracking-tight">
            EQ<span className="text-[#2DC88A]">I</span>
          </div>
          <span className="text-white/40 text-xs">Planejamento em Foco · 2026</span>
        </div>

        <div className="bg-[#F5F2EC] rounded-2xl p-8 md:p-12 text-center">
          <div className="inline-block bg-[#0A3D2E] text-[#2DC88A] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            Quiz ao vivo
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-[#0A3D2E] leading-tight mb-3">
            Aponte a câmera do<br />
            <span className="italic text-[#1A6B50]">celular para entrar</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
            Escaneie o QR code abaixo para abrir o quiz e disputar o ranking ao vivo com os outros participantes.
          </p>

          <div className="bg-white rounded-2xl p-6 inline-block border border-gray-200 mb-6">
            {quizUrl ? (
              <QRCodeSVG
                value={quizUrl}
                size={288}
                level="M"
                fgColor="#0A3D2E"
                bgColor="#FFFFFF"
              />
            ) : (
              <div className="w-72 h-72 flex items-center justify-center text-gray-300 text-sm">
                Gerando QR code…
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-1">Ou acesse pelo navegador:</p>
          <a
            href={quizUrl || '#'}
            className="text-sm font-medium text-[#1A6B50] hover:underline break-all"
          >
            {quizUrl || '…'}
          </a>
        </div>

      </div>
    </div>
  )
}
