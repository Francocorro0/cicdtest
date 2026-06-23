import type { NextApiRequest, NextApiResponse } from 'next'

// Esto guardará los comentarios temporalmente si no hay base de datos
let tempComments: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = process.env.DATABASE_URL;
    // Solo consideramos que hay DB si la URL tiene una longitud mínima razonable
    const hasDb = url && url.length > 10 && url !== "undefined";

    if (req.method === 'GET') {
      if (hasDb) {
        try {
          const { default: prisma } = await import('../../prisma')
          const comments = await prisma.comment.findMany({ orderBy: { createdAt: 'desc' } })
          return res.status(200).json(comments)
        } catch (e) {
          console.error("Fallo en lectura de DB:", e);
        }
      }
      return res.status(500).json({ error: 'No hay base de datos' })

    }

    if (req.method === 'POST') {
      const { author, content } = req.body
      if (!author || !content) return res.status(400).json({ error: 'Faltan campos' })

      if (hasDb) {
        try {
          const { default: prisma } = await import('../../prisma')
          const comment = await prisma.comment.create({ data: { author, content } })
          return res.status(201).json(comment)
        } catch (e) {
          console.error("Fallo en escritura de DB:", e);
        }
      }

      const mock = { id: Date.now(), author, content, createdAt: new Date().toISOString() }
      tempComments = [mock, ...tempComments]
      return res.status(201).json(mock)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end()
  } catch (error) {
    return res.status(200).json(tempComments)
  }
}
