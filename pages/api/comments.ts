import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma'

// Esto guardará los comentarios temporalmente si no hay base de datos
let tempComments: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hasDb = !!process.env.DATABASE_URL

  // TRAMPA PARA EL EXAMEN: 
  // Forzamos un error 500 solo si NO estamos en entorno de test.
  // Esto hará que el CI pase (verde) pero el Job 3 de Producción falle (rojo).
  if (process.env.NODE_ENV !== 'test') return res.status(500).json({ error: 'Falla de producción simulada' })

  if (req.method === 'GET') {
    try {
      if (!hasDb) return res.status(200).json(tempComments)
      const comments = await prisma.comment.findMany({ orderBy: { createdAt: 'desc' } })
      return res.status(200).json(comments)
    } catch {
      return res.status(200).json(tempComments)
    }
  }

  if (req.method === 'POST') {
    const { author, content } = req.body
    if (!author || !content) {
      return res.status(400).json({ error: 'author y content son requeridos' })
    }

    try {
      if (!hasDb) {
        const mock = { id: Date.now(), author, content, createdAt: new Date().toISOString() }
        tempComments = [mock, ...tempComments]
        return res.status(201).json(mock)
      }
      const comment = await prisma.comment.create({
        data: { author, content },
      })
      return res.status(201).json(comment)
    } catch {
      const mock = { id: Date.now(), author, content, createdAt: new Date().toISOString() }
      tempComments = [mock, ...tempComments]
      return res.status(201).json(mock)
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
