import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Página principal', () => {
  beforeAll(() => {
    // Mock global.fetch usado en useEffect
    // Devuelve una lista vacía de comentarios
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    )
  })

  afterAll(() => {
    // @ts-ignore
    delete (global as any).fetch
  })

  it('renderiza el título y el formulario de comentarios', async () => {
    render(<Home />)

    expect(await screen.findByText(/Demo de frontend moderno para CI\/CD/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Tu nombre/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Deja un comentario/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Enviar comentario/i })).toBeInTheDocument()
  })
})
