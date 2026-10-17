# TeEncuentran — ¿Te encuentran en ChatGPT?

MVP W1 del GEO SaaS para restaurantes y cafés en CDMX. Landing + diagnóstico
de 2 minutos (100% rule-based, sin IA) + captación de leads para la beta.

Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase
(Auth + Postgres). Producción: `https://teencuentran.mx` (Vercel + Cloudflare DNS).

## Rutas

| Ruta | Qué es |
|---|---|
| `/` | Landing: hero, problema, 3 propuestas de valor, cómo funciona, precio (MXN 499/mes), CTA beta |
| `/diagnostico` | Diagnóstico de 6 preguntas, una por pantalla, optimizado para tablet. Score /100 + tier + 3 hallazgos accionables, todo calculado en el cliente |
| `/beta` | Formulario de registro a la beta (nombre, negocio, WhatsApp, email) → tabla `leads` en Supabase |
| `/login` | Entrar con Google (Supabase Auth). Sin env vars muestra mensaje amable |
| `/auth/callback` | Callback de OAuth (intercambia `code` por sesión) |
| `POST /api/leads` | Inserta el lead en Supabase. Sin env vars responde 503 y el formulario muestra fallback |

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # completa con tus valores de Supabase
npm run dev                  # http://localhost:3000
```

Sin `.env.local`, el sitio funciona igual: `/beta` muestra un mensaje de
"estamos activando el registro" y `/login` un aviso, en lugar de romperse.

## Variables de entorno

| Variable | Dónde se consigue |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |

## Supabase: base de datos

Ejecuta `supabase/schema.sql` en el SQL Editor de tu proyecto Supabase.
Crea la tabla `leads` (id, nombre, negocio, whatsapp, email, score,
respuestas jsonb, created_at) con RLS y política de INSERT para `anon`.

## Supabase: Google OAuth

1. Google Cloud Console → credenciales OAuth 2.0 (tipo Web).
2. En Supabase → Authentication → Providers → Google: pega Client ID y Secret.
3. Redirect URL autorizada en Google: `https://<tu-proyecto>.supabase.co/auth/v1/callback`
4. En Supabase → Authentication → URL Configuration → Site URL: `https://teencuentran.mx`
   (para local: `http://localhost:3000`; agrégala en Redirect URLs).

## Deploy en Vercel

1. Sube el repo a GitHub.
2. Vercel → Add New Project → importa el repo.
3. Environment Variables: agrega `NEXT_PUBLIC_SUPABASE_URL` y
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Production).
4. Deploy. Luego en Vercel → Settings → Domains agrega `teencuentran.mx`
   (y `www.teencuentran.mx`): como el DNS ya está en Cloudflare, Vercel te
   pedirá crear los registros A/CNAME que te indique — o usa nameservers de
   Cloudflare tal como están y apunta los registros manualmente.

## Diagnóstico: lógica de puntaje

Ver `lib/diagnosis.ts` (spec en `../MVP-PLAN.md` §6):

- Pesos por pregunta: 20 / 20 / 20 / 15 / 15 / 10 = 100
- Niveles: <35 “En riesgo” · <60 “Visibilidad parcial” · <80 “En crecimiento” · ≥80 “Excelente”
- El resultado muestra las 3 dimensiones más débiles con una acción concreta cada una.
