export const validateEmail = email => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

export function calculateAge(fechaNacimiento) {
  let fechaNace = new Date(fechaNacimiento)
  let fechaActual = new Date()

  let mes = fechaActual.getMonth()
  let dia = fechaActual.getDate()
  let año = fechaActual.getFullYear()

  fechaActual.setDate(dia)
  fechaActual.setMonth(mes)
  fechaActual.setFullYear(año)

  return Math.floor((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365)
}

export function formatNumber(number = 0) {
  // Convertir el número a cadena
  let numberStr = number.toString()

  // Usar una expresión regular para insertar puntos
  let resultado = numberStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  return resultado
}

export function formatNumberToPhone(number = 0) {
  // Convertir el número a cadena
  let numberStr = number.toString()
  // Usar una expresión regular para insertar puntos
  let resultado = numberStr.replace(
    /(\d{4})(\d{3})(\d{2})(\d{2})/,
    '($1) $2 $3 $4'
  )
  return resultado
}

const roles = {
  Administrador: 1,
  Desarrollador: 2,
  Médico: 3,
  Visualizador: 4,
}

export function getIdByRol(rol) {
  return roles[rol] || null
}

export function getIdByStatus(status) {
  return status === 'Habilitado' ? 1 : 2
}

export const today = new Date()
export const eighteenYearsBefore = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
)
  .toISOString()
  .split('T')[0]
