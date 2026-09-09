const USERS_KEY = "usuarios"
const CURRENT_USER_KEY = "usuarioActual"

const DEFAULT_USERS = [
  {
    email: "admin@proa.com",
    password: "123456",
    rol: "director"
  }
]

export function obtenerUsuarios() {
  const guardados = localStorage.getItem(USERS_KEY)

  if (!guardados) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS))
    return [...DEFAULT_USERS]
  }

  try {
    return JSON.parse(guardados)
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS))
    return [...DEFAULT_USERS]
  }
}

export function registrarUsuario(usuario) {
  const usuarios = obtenerUsuarios()

  const existe = usuarios.some(
    (item) => item.email.toLowerCase() === usuario.email.toLowerCase()
  )

  if (existe) {
    return {
      ok: false,
      mensaje: "Ya existe una cuenta con ese correo."
    }
  }

  usuarios.push({
    email: usuario.email,
    password: usuario.password,
    rol: usuario.rol
  })

  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios))

  return { ok: true }
}

export function iniciarSesion(email, password) {
  const usuarios = obtenerUsuarios()

  const usuario = usuarios.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  )

  if (!usuario) {
    return {
      ok: false,
      mensaje: "El correo o la contraseña son incorrectos."
    }
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(usuario))

  return {
    ok: true,
    usuario
  }
}

export function obtenerUsuarioActual() {
  const guardado = localStorage.getItem(CURRENT_USER_KEY)

  if (!guardado) return null

  try {
    return JSON.parse(guardado)
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY)
    return null
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function tieneRol(roles) {
  const usuario = obtenerUsuarioActual()
  if (!usuario) return false

  return roles.includes(usuario.rol)
}
