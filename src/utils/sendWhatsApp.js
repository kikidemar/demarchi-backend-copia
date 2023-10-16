import twilio from 'twilio'
import config from '../config/config.js'

const cliente = twilio(config.twilio_sid, config.twilio_token)

const sendWhatsApp = async (nombre, apellido) => {
  await cliente.messages.create({
    body: `Gracias por tu compra ${nombre} ${apellido}`,
    from:'whatsapp:+14155238886',
    to: `whatsapp:+${config.my_phone}`
  })
}

export default sendWhatsApp
