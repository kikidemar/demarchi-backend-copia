import express from 'express';
import dotenv from './config/config.js'
import { connect } from 'mongoose'
import index_router from './router/index_router.js'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import { __dirname } from './utils/dirname.js'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import morgan from 'morgan'
import mongoStore from 'connect-mongo'
import passport from 'passport'
import inicializePassport from './config/passport.js'
import {addLogger} from './config/logger.js'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'


const server = express()

//middlewares

server.use(cookieParser(process.env.SECRET_COOKIE)) 
server.use(expressSession({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  store: mongoStore.create({
    mongoUrl: process.env.LINK_MONGO,
    ttl: 10000
  })
}))

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion de app',
      description: 'Api pensada para commerce de bebidas'
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)

server.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

server.use('', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(cors())
server.use(morgan('dev'))

inicializePassport()
server.use(passport.initialize())
server.use(passport.session())
server.use(addLogger)

server.use('/', index_router)
server.use(errorHandler)
server.use(notFoundHandler)




//database



export default server
