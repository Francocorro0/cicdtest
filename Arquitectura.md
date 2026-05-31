# Arquitectura del Sistema: Informativo CI/CD

Este documento describe la arquitectura actual del proyecto y mantiene un registro de los cambios técnicos realizados.

## 1. Stack Tecnológico Actual
- **Frontend:** Next.js (Pages Router).
- **Estilos:** Tailwind CSS.
- **ORM:** Prisma con PostgreSQL.
- **Base de datos:** PostgreSQL en Neon, configurada con `DATABASE_URL`.
- **Testing:** Jest + React Testing Library + JSDOM.
- **Ejecución local:** `npm run dev`.

## 2. Arquitectura Actual del Proyecto
- `package.json` define scripts, dependencias y los comandos de Prisma.
- `tsconfig.json` configura TypeScript para Next.js y tests.
- `next-env.d.ts` habilita los tipos de Next.
- `postcss.config.cjs` y `tailwind.config.cjs` configuran Tailwind.
- `styles/globals.css` importa Tailwind y define estilos base.
- `pages/_app.tsx` carga los estilos globales.
- `pages/index.tsx` es la página principal de la app.
- `pages/api/comments.ts` es la API REST que expone comentarios.
- `prisma/schema.prisma` define el modelo `Comment`.
- `prisma.ts` inicializa el cliente Prisma.

## 3. Estructura de Archivos Actual
```text
cicdtest/
├── .gitignore              # Ignora node_modules, .next, .env, etc.
├── .env.example            # Ejemplo de conexión a Neon PostgreSQL
├── Arquitetura.md          # Documentación de arquitectura y cambios
├── ci.yml                  # Workflow de CI en GitHub Actions (pendiente)
├── next-env.d.ts           # Tipos de Next
├── package.json            # Scripts y dependencias
├── postcss.config.cjs      # Configuración de PostCSS
├── prisma/
│   └── schema.prisma       # Esquema Prisma
├── prisma.ts               # Cliente Prisma compartido
├── pages/
│   ├── _app.tsx            # Entrada global de Next
│   ├── api/
│   │   └── comments.ts     # API de comentarios
│   └── index.tsx           # Página principal
├── styles/
│   └── globals.css         # Estilos Tailwind globales
├── tsconfig.json           # Configuración TypeScript
├── tailwind.config.cjs     # Configuración Tailwind
└── simple.test.ts          # Test ejemplo para CI
```

## 4. Diseño local
- La app se renderiza como página Next.js.
- El diseño usa Tailwind CSS para componentes y layout moderno.
- El formulario de comentarios consume la API `GET /api/comments` y `POST /api/comments`.
- Los comentarios se guardan en PostgreSQL mediante Prisma.

## 5. Flujo de CI/CD
1.  **CI (GitHub Actions):**
    - Instalación de dependencias.
    - Generación de Prisma.
    - Ejecución de tests con Jest + React Testing Library.
    - Build con Next.js.
2.  **CD:**
    - Actualmente la app se prueba localmente con `npm run dev`.
    - El flujo de despliegue automático puede integrarse a Vercel o Netlify.

## 6. Registro de cambios
- **31/05/2026:** Migración a Next.js con Pages Router.
- **31/05/2026:** Configuración de Tailwind CSS y PostCSS.
- **31/05/2026:** Implementación de Prisma con PostgreSQL/Neon.
- **31/05/2026:** Creación de `pages/api/comments.ts` para la API de comentarios.
- **31/05/2026:** Eliminación completa de archivos de configuración de Vite y limpieza de index.tsx.
- **31/05/2026:** Eliminación de Vitest y migración total a Jest para evitar conflictos de build.
- **31/05/2026:** Limpieza de archivos legacy y documentación de los cambios. 

## 7. Nota de seguimiento
A partir de ahora, cada cambio relevante en el proyecto se documentará en este archivo para mantener claro el historial de arquitectura y decisiones técnicas.