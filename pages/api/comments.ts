import type { NextApiRequest, NextApiResponse } from 'next'

// Esto guardará los comentarios temporalmente si no hay base de datos
let tempComments: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hasDb = !!process.env.DATABASE_URL
    
    // Cargamos Prisma de forma dinámica solo si existe la variable de entorno.
    // Esto evita que el servidor "explote" antes de empezar si no hay conexión.
    let prismaInstance: any = null;
    if (hasDb) {
      try {
        const { default: p } = await import('../../prisma')
        prismaInstance = p
      } catch (importError) {
        console.error("No se pudo cargar el cliente de Prisma:", importError);
      }
    }

    if (req.method === 'GET') {
      if (hasDb && prismaInstance) {
        try {
          const comments = await prismaInstance.comment.findMany({ orderBy: { createdAt: 'desc' } })
          return res.status(200).json(comments)
        } catch (e) {
          console.error("Error al leer de DB, usando memoria temporal:", e);
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
          console.error("Error al guardar en DB, usando memoria temporal:", e);
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
