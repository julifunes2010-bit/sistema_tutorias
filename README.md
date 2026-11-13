# Sistema de Tutorías ProA

Aplicación web para organizar y consultar información relacionada con las tutorías escolares. El proyecto está en desarrollo y usa Vue 3, Vue Router, Vite y Supabase.

## Funcionalidades disponibles

La aplicación cuenta con pantallas y rutas para:

- Inicio de sesión, registro y recuperación de cuenta.
- Inicio y navegación principal.
- Consulta de cursos y reportes.
- Creación y consulta de citaciones.
- Configuración de la aplicación, incluido el modo oscuro.

El alcance y la conexión de cada pantalla con los servicios de backend pueden seguir evolucionando.

## Requisitos

- Node.js `^22.18.0` o `>=24.12.0`.
- npm.
- Un proyecto de Supabase con las variables de entorno configuradas.

## Puesta en marcha

La aplicación Vue está en `sistemaTutorias/`:

```sh
cd sistemaTutorias
npm install
```

Crea `sistemaTutorias/.env.local` con las credenciales públicas de tu proyecto de Supabase:

```dotenv
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-clave-publicable
```

No subas claves secretas ni el archivo `.env.local` al repositorio. La aplicación lee estas variables desde `src/lib/supabase.js`.

Inicia el servidor de desarrollo:

```sh
npm run dev
```

Genera y previsualiza la versión de producción:

```sh
npm run build
npm run preview
```

## Estructura

```text
sistemaTutorias/
├── src/
│   ├── components/   # Componentes reutilizables
│   ├── lib/          # Cliente de Supabase
│   ├── assets/       # Estilos e imágenes
│   ├── router/       # Rutas de la aplicación
│   └── *.vue         # Vistas principales
├── public/
└── package.json
```

## Estado

El sistema está en desarrollo y el frontend todavía no tiene una versión de lanzamiento (el `package.json` declara `0.0.0`). Este repositorio no incluye instrucciones de despliegue ni un esquema de base de datos.

## Equipo

- [Maximo Sandoval](https://github.com/meteoro-sys)
- [Julian Funes](https://github.com/julifunes2010-bit)
- [Yair Lozano](https://github.com/yairLozano)

Profesor: [Luis Siccardi](https://github.com/luis-siccardi)
