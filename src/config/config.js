import dotenv from 'dotenv'
import commander from "../utils/commander.js"
import {connect} from 'mongoose'
import MongoSingleton from './MongoSingleton.js'

const {mode} = commander.opts()

dotenv.config({
  path: mode === 'development' ? './.env.development' : './.env.production',
}
)

const config = {
  gmail_user_app: process.env.GMAIL_USER_APP ,
  gmail_pass_app: process.env.GMAIL_PASS_APP ,
  twilio_sid: process.env.TWILIO_SID,
  twilio_token: process.env.TWILIO_TOKEN,
  my_phone: process.env.MY_PHONE,
  privateKeyJwt: process.env.SECRET_JWT || '',
  PORT: process.env.PORT                     || 8000,
  LINK_MONGO: process.env.LINK_MONGO           || '',
  persistence: process.env.PERSISTENCE,
  LOGGER: process.env.LOGGER,
  connectDB: () => MongoSingleton.getInstance()
}

export default config