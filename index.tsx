import React, { useState, useEffect } from 'react'

const initialComments = [
  { id: 1, author: 'Profesor de Ejemplo', content: '¡Excelente arquitectura para el TP!', createdAt: new Date().toISOString() },
  { id: 2, author: 'Guía CI/CD', content: 'Si ves esto, estás en modo offline.', createdAt: new Date().toISOString() }
]

export default function Home() {
  const [comments, setComments] = useState(initialComments)
  const [form, setForm] = useState({ author: '', content: '' })

  useEffect(() => {
    document.title = 'CI/CD Informativo'
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment = {
      id: Date.now(),
      author: form.author,
      content: form.content,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setForm({ author: '', content: '' });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Proyecto CI/CD</p>
          <h1 className="brand-title">Demuestra tu pipeline con estilo</h1>
        </div>
        <div className="top-actions">
          <span className="pill">Local preview</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="hero-tag">Laboratorio interactivo</span>
          <h2>UI moderna para tu Trabajo Práctico</h2>
          <p className="hero-text">Un ejemplo de aplicación que puede ejecutarse localmente, con feedback instantáneo y un diseño visual elegante para presentar tu CI/CD.</p>

          <div className="hero-metrics">
            <div className="metric-card">
              <strong>CI</strong>
              <span>Pruebas automáticas</span>
            </div>
            <div className="metric-card">
              <strong>CD</strong>
              <span>Despliegue continuo</span>
            </div>
            <div className="metric-card">
              <strong>Feedback</strong>
              <span>Comentarios directos</span>
            </div>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-card">
            <p className="panel-label">Estado actual</p>
            <h3>Listo para testear</h3>
            <p>Ejecuta `npm run dev` y muestra a tus evaluadores una app moderna y funcional.</p>
          </div>

          <div className="panel-grid">
            <div className="panel-info">
              <p className="panel-info-title">Framework</p>
              <p>Next.js</p>
            </div>
            <div className="panel-info">
              <p className="panel-info-title">Testing</p>
              <p>Jest</p>
            </div>
            <div className="panel-info">
              <p className="panel-info-title">Deploy</p>
              <p>Preview local</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="section-grid">
        <article className="section-card">
          <h2>¿Qué estamos probando?</h2>
          <p>Este proyecto muestra un flujo práctico de CI/CD, listo para validación y demostración.</p>
          <ul>
            <li><strong>Integración Continua:</strong> tests y build automatizados.</li>
            <li><strong>Despliegue Continuo:</strong> presentación rápida del proyecto.</li>
            <li><strong>Experiencia UI:</strong> diseño moderno y responsive.</li>
          </ul>
        </article>

        <article className="section-card">
          <h2>Comentarios</h2>
          <form onSubmit={handleSubmit} className="comment-form">
            <input
              className="input"
              placeholder="Tu nombre"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />
            <textarea
              className="textarea"
              placeholder="Deja un comentario sobre el TP"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
            <button className="button" type="submit">
              Enviar comentario
            </button>
          </form>

          <div className="comments-list">
            {comments.map((c, i) => (
              <div key={i} className="comment-card">
                <p className="comment-author">{c.author}</p>
                <p className="comment-text">{c.content}</p>
                <p className="comment-date">{new Date(c.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}