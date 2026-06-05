# Capitalta Web

Plataforma web de Capitalta - Soluciones financieras.

## Stack Tecnológico

- Next.js 16
- React 19
- Material UI 7
- Supabase (Backend & Auth)

## Configuración Local

1. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

2. Configurar variables de entorno:
   Copiar `.env.example` a `.env` y configurar las credenciales de Supabase.
   Para verificación de RFC (opcional), configurar variables `VERIFICAMEX_*` en `.env` (no en `.env.example`).

### VerificaMex (RFC ante SAT)

Para habilitar la verificación real de RFC (además de la validación local de formato), configura estas variables:

- En local: en `.env`
- En producción: en Vercel → Project → Settings → Environment Variables

Variables:

- `VERIFICAMEX_API_BASE_URL=https://api.verificamex.com/identity/v1`
- `VERIFICAMEX_API_KEY=...` (Bearer token)

3. Ejecutar en desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Despliegue

El proyecto está optimizado para despliegue en Vercel.
