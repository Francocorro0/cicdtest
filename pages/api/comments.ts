import type { NextApiRequest, NextApiResponse } from 'next'

// Esto guardará los comentarios temporalmente si no hay base de datos
let tempComments: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hasDb = !!process.env.DATABASE_URL
    
    let prismaInstance: any;
    if (hasDb) {
      const { default: p } = await import('../../prisma')
      prismaInstance = p
    }

    if (req.method === 'GET') {
      if (hasDb && prismaInstance) {
        try {
          const comments = await prismaInstance.comment.findMany({ orderBy: { createdAt: 'desc' } })
          return res.status(200).json(comments)
        } catch (e) {
          console.error("Error de DB, usando memoria temporal");
        }
      }
      return res.status(200).json(tempComments)
    }

    if (req.method === 'POST') {
      const { author, content } = req.body
      if (!author || !content) return res.status(400).json({ error: 'Faltan campos' })

      if (hasDb && prismaInstance) {
        try {
          const comment = await prismaInstance.comment.create({ data: { author, content } })
          return res.status(201).json(comment)
        } catch (e) {
          console.error("Error de DB, usando memoria temporal");
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
