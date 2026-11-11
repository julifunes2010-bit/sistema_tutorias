# sistemaTutorias

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Práctica: horarios con Supabase

La vista `/horarios` consulta la tabla `tutorias`, permite agregar y editar filas por `id`, y filtra materia, curso y día en Vue. Al entrar y al guardar se consulta Supabase; no se usa `localStorage` como fuente de estos horarios.

1. En el panel de Supabase, ejecutá [`supabase/schema.sql`](supabase/schema.sql) en SQL Editor. Crea `tutorias` con `id` autogenerado y campos obligatorios `materia`, `curso`, `dia` y `horario`; activa RLS y permite leer, agregar y editar solo a usuarios autenticados.
2. Copiá `.env.example` como `.env.local` y reemplazá los valores por la URL del proyecto y su clave publicable.
3. Creá o habilitá las cuentas de prueba en Supabase Auth. Esta práctica no guarda contraseñas en la app; el formulario de login usa Supabase Auth cuando la conexión está configurada.
4. Reiniciá Vite con `npm run dev`, iniciá sesión y abrí `Horarios de tutoría`. Guardá una fila, recargá y verificá la misma fila desde otro navegador con una cuenta autorizada.

La clave `VITE_SUPABASE_PUBLISHABLE_KEY` es visible en el navegador; nunca pongas una clave `service_role` o un secreto en variables `VITE_*`. Las políticas de ejemplo autorizan a cualquier usuario autenticado del proyecto a leer y modificar horarios. Si el proyecto requiere permisos por rol, ajustá esas políticas antes de usar datos reales. Sin configuración o sesión, la vista muestra el motivo y no presenta datos locales como si fueran compartidos.
