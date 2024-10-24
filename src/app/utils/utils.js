export const validateEmail = email => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

export function whatIsMyAge(fechaNacimiento) {
  let fechaNace = new Date(fechaNacimiento);
  let fechaActual = new Date()

  let mes = fechaActual.getMonth();
  let dia = fechaActual.getDate();
  let año = fechaActual.getFullYear();

  fechaActual.setDate(dia);
  fechaActual.setMonth(mes);
  fechaActual.setFullYear(año);

  return Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));;
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  
  // Obtener el día, mes y año
  const day = String(date.getUTCDate()).padStart(2, '0');
  const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const month = monthNames[date.getUTCMonth()]; // Mes comienza en 0
  const year = date.getUTCFullYear();
  
  // Formatear la fecha
  return `${day} ${month.slice(0, 3)}. ${year}`;
}

export function formatNumber(number = 0) {
  // Convertir el número a cadena
  let numberStr = number.toString();
  
  // Usar una expresión regular para insertar puntos
  let resultado = numberStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  
  return resultado;
}