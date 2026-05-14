import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { name, score, total } = await req.json()
    if (!name || typeof score !== 'number') {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }
    const { error } = await supabase
      .from('quiz_scores')
      .insert({ name: name.trim().slice(0, 40), score, total })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('name, score, total, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(500)

    if (error) throw error

    const seen = new Map<string, typeof data[0]>()
    for (const row of data ?? []) {
      const key = row.name.toLowerCase().trim()
      const existing = seen.get(key)
      if (!existing || row.score > existing.score) {
        seen.set(key, row)
      }
    }

    const ranking = Array.from(seen.values())
      .sort((a, b) => b.score - a.score || new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .slice(0, 30)
      .map((r, i) => ({
        position: i + 1,
        name: r.name,
        score: r.score,
        total: r.total
      }))

    return NextResponse.json(ranking)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
