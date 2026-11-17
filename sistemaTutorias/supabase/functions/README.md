# Chat de ayuda Beta

La función `help-chat` valida la sesión Supabase del usuario y envía su consulta a `est.sandoval.maximo@gmail.com` con Resend. El correo de la cuenta autenticada queda como dirección de respuesta.

## Configuración local

1. Copiá `.env.example` como `.env` dentro de esta carpeta y completá una clave de Resend y un remitente de un dominio verificado.
2. Desde `sistemaTutorias/`, iniciá la función con `supabase functions serve help-chat --env-file supabase/functions/.env`.

## Configuración del proyecto remoto

Configurá los secretos `RESEND_API_KEY` y `HELP_CHAT_FROM_EMAIL` en Supabase Edge Function Secrets, y desplegá `help-chat` con la CLI de Supabase. El secreto de Resend nunca se usa desde el navegador.
