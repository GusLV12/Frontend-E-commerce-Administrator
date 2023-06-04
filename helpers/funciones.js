//--> Funcion para token
export const temporizador = (tiempo) => {
  let minutos = Math.floor(tiempo / 60)
  let segundos = tiempo % 60

  if (segundos >= 10) return `0${minutos}:${segundos}`
  else return `0${minutos}:0${segundos}`
}

//--> Darle formato al precio
export const formatoPrecio = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};