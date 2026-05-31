# CICD Test — Proyecto Next.js + Tailwind + Prisma

Resumen rápido
- Frontend: Next.js (Pages Router)
- Estilos: Tailwind CSS
- ORM: Prisma (PostgreSQL — Neon recomendado)
- Tests: Jest + React Testing Library

Requisitos
- Node.js v18+ (recomendado v24)
- npm (en Windows usar `npm.cmd` si hay problemas con PowerShell)
- Un proveedor PostgreSQL (Neon) o un PostgreSQL local

Configuración
1. Copia el ejemplo de variables de entorno:

```bash
copy .env.example .env
```

2. Rellena `DATABASE_URL` en `.env` con tu conexión Neon/Postgres. Ejemplo:

```
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
```

Instalación

```bash
npm install
```

Prisma (generar cliente y migraciones)

```bash
npm run prisma:generate
npm run prisma:migrate
```

Ejecutar en desarrollo

```bash
npm run dev
# Abrir http://localhost:3000
```

Tests
- El proyecto usa `jest` y `@testing-library/react`.
- Ejecuta:

```bash
npm test
```

Build y producción

```bash
npm run build
npm run start
```

Trello CI notifications
- Si quieres recibir información de fallos directamente en Trello, puedes configurar los secrets del repositorio:
  - `TRELLO_KEY`
  - `TRELLO_TOKEN`
  - `TRELLO_LIST_ID`
- Cuando el job de `build` falle, el workflow creará una nueva tarjeta en la lista de Trello indicada con el enlace al run.
- Para obtener `TRELLO_LIST_ID`, copia el ID corto de la lista donde quieres crear las tarjetas (no el ID de tarjeta).

Arquitectura y notas
- La arquitectura usa PostgreSQL (Neon) como servicio de base de datos; la configuración está en [prisma/schema.prisma](prisma/schema.prisma).
- API de comentarios: [pages/api/comments.ts](pages/api/comments.ts)
- Página principal: [pages/index.tsx](pages/index.tsx)
- Cliente Prisma singleton: [prisma.ts](prisma.ts)
- Documentación de la arquitectura: [Arquitectura.md](Arquitectura.md)

Siguientes pasos recomendados
- Proveer `DATABASE_URL` y ejecutar las migraciones.
- Si quieres, puedo convertir el test Vitest existente a Jest y crear ejemplos de tests para el componente principal.

Contacto
- Si necesitas que actualice `Arquitectura.md` con lo referente a Jest + RTL, dímelo y lo hago.
