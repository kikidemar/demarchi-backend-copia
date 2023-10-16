import nodemailer from 'nodemailer'
import config from '../config/config.js'
import {__dirname} from './dirname.js'

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user:config.gmail_user_app ,
    pass:config.gmail_pass_app
  }
})

const sendMail = async (userMail,subject, html) => {
  return await transport.sendMail({
    from: `<Servicio de ${config.gmail_user_app}>`,
    to: userMail,
    subject: subject,
    html: html,
    attachments: [{
      // filename: 'nodejs.png',
      // path: __dirname+'img/nodejs.png',
      // cid: 'nodejs'
  }]
  })
}

export default sendMail
