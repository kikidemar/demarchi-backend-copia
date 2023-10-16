import { request } from "express"
import EErrors from "./enums"

const errorMiddleware = (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code){
      case EErrors.INVALID_TYPE_ERROR:
        res.send({status: 'error', error: error.name})
        break
     case EErrors.ROUTING_ERROR:
        res.send({status: 'error', error:error.name})
        break
      case EErrors.DATABASE_ERROR:
        res.send({status: 'error', error:error.name})
        break

      default:
        res.send({status: 'error', error: 'error'})
    }
}

export default errorMiddleware