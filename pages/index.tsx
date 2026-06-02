import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'

interface Comment {
  id: number
  author: string
  content: string
  createdAt: string
}

export default function Home() {
  const [comments, setComments] = useState<Comment[]>([])
  const [form, setForm] = useState({ author: '', content: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => setComments([]))
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.author.trim() || !form.content.trim()) return

    setLoading(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const newComment = await response.json()
      setComments((prev) => [newComment, ...prev])
      setForm({ author: '', content: '' })
    } catch (error) {
      console.error("Error al enviar:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>CI/CD Informativo</title>
        <meta
          name="description"
          content="Frontend con Next.js, Tailwind CSS y Prisma para el trabajo práctico de CI/CD"
        />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-500/20">
                Next.js + Tailwind + Prisma
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Aguante el asado - Error de prueba
                </h1>
                <p className="max-w-2xl text-slate-300 sm:text-lg">
                  Una aplicación demostrativa que usa Next.js, una API con Prisma y un diseño limpio con Tailwind CSS.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Frontend</p>
                <p className="mt-3 text-2xl font-semibold text-white">Next.js</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-6 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Estilos</p>
                <p className="mt-3 text-2xl font-semibold text-white">Tailwind CSS</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">¿Qué estamos probando?</h2>
              <p className="text-slate-300">
                Este proyecto integra un frontend de Next.js con Tailwind CSS para la UI y Prisma para acceder a datos en PostgreSQL vía Neon.
              </p>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">CI: validación de código y tests.</li>
              <li className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">CD: presentación local y despliegue con la app.</li>
              <li className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/10">ORM: Prisma maneja el modelo de comentarios.</li>
            </ul>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Estado actual</h2>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">API</p>
                <p className="mt-3 text-xl font-semibold text-white">/api/comments</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-white/10">
                <p className="text-sm text-slate-400">Base de datos</p>
                <p className="mt-3 text-xl font-semibold text-white">PostgreSQL con Neon</p>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-soft backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Comentarios</h2>
              <p className="text-sm text-slate-400">Agrega tu feedback y prueba la API.</p>
            </div>
            <p className="text-sm text-slate-400">{comments.length} comentario{comments.length === 1 ? '' : 's'}</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              className="rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              placeholder="Tu nombre"
              value={form.author}
              onChange={(event) => setForm({ ...form, author: event.target.value })}
              required
            />
            <textarea
              className="min-h-[140px] rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
              placeholder="Deja un comentario sobre el TP"
              value={form.content}
              onChange={(event) => setForm({ ...form, content: event.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Enviando...' : 'Enviar comentario'}
            </button>
          </form>

          <div className="mt-8 grid gap-4">
            {comments.map((comment) => (
              <article key={comment.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-semibold text-white">{comment.author}</p>
                  <p className="text-sm text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="mt-3 text-slate-300">{comment.content}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
