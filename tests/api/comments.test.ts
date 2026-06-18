jest.mock('../../prisma', () => {
  const mockPrisma = {
    comment: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  }
  return {
    __esModule: true,
    prisma: mockPrisma,
    default: mockPrisma,
  }
})

import handler from '../../pages/api/comments'
import prisma from '../../prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

function mockRes() {
  const json = jest.fn()
  const end = jest.fn()
  const status = jest.fn().mockReturnValue({ json, end })
  const setHeader = jest.fn()
  return { status, json, end, setHeader }
}

describe('API /api/comments', () => {
  beforeAll(() => {
    // Forzamos a que la API crea que hay una DB para que use Prisma
    process.env.DATABASE_URL = 'postgresql://mock:mock@localhost:5432/mock'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('GET debe devolver error 500 en produccion', async () => {
    const req = { method: 'GET' } as Partial<NextApiRequest>
    const res = mockRes() as unknown as NextApiResponse

    await handler(req as NextApiRequest, res)

    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500)
  })

  it('POST crea un comentario cuando los campos están presentes', async () => {
    const created = { id: 2, author: 'User', content: 'Hola', createdAt: new Date().toISOString() }
    ;(prisma.comment.create as jest.Mock).mockResolvedValue(created)

    const req = { method: 'POST', body: { author: 'User', content: 'Hola' } } as Partial<NextApiRequest>
    const res = mockRes() as unknown as NextApiResponse

    await handler(req as NextApiRequest, res)

    expect(prisma.comment.create).toHaveBeenCalledWith({ data: { author: 'User', content: 'Hola' } })
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(201)
  })

  it('POST retorna 400 si faltan campos', async () => {
    const req = { method: 'POST', body: { author: '', content: '' } } as Partial<NextApiRequest>
    const res = mockRes() as unknown as NextApiResponse

    await handler(req as NextApiRequest, res)

    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(400)
    expect((res.status as jest.Mock).mock.results[0].value.json).toBeDefined()
  })
})
