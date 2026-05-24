const num = process.env.NEXT_PUBLIC_WA_NUMBER ?? '573223094005'
const msg = process.env.NEXT_PUBLIC_WA_MESSAGE ?? 'Hola%2C%20quiero%20agendar%20una%20cita%20con%20Relevvo%20Studio%20%F0%9F%9A%80'

export const WA_URL = `https://wa.me/${num}?text=${msg}`
