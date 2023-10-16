import { Router } from "express";
import sendmail from "../../utils/sendMail.js";
import sendWhatsApp from "../../utils/sendWhatsApp.js";


const mailing_router = Router()

mailing_router.get('/', async (req,res) => {
  await sendmail(
    'demarchi.christiann@gmail.com',
    'Mail de prueba',
    `<h1>Esto es un correo de prueba</h1>`
  )
  res.send('mail enviado')
})

mailing_router.get('/wa', async (req,res) => {
  await sendWhatsApp('chris', 'demar')
  res.send('sms enviado')

})

export default mailing_router