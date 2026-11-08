# API NestJS para Vercel

API mínima con NestJS. La ruta `GET /` devuelve `{"message":"La API funciona"}`.

## Desarrollo local

Requiere Node.js 20 o superior.

```bash
npm install
npm run start:dev
```

Abrir `http://localhost:3000/`.

## Vercel

Importar el repositorio en Vercel y mantener el comando de build `npm run build`.
El punto de entrada serverless está en `api/index.ts`; las rutas se reescriben
para que NestJS gestione la petición. No se configura una base de datos todavía.
