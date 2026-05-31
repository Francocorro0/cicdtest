import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const comments = await prisma.comment.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(comments)
  }

  if (req.method === 'POST') {
    const { author, content } = req.body

    if (!author || !content) {
      return res.status(400).json({ error: 'author y content son requeridos' })
    }

    const comment = await prisma.comment.create({
      data: {
        author,
        content,
      },
    })

    return res.status(201).json(comment)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
