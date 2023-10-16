import mongoose from 'mongoose'
import dotenv from 'dotenv'

export default class MongoSingleton {
  static #instance    //el numeral lo convierte en privada y solo puede accederse desde la clase

  constructor(){
    mongoose.connect(process.env.LINK_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    })

  }

  static getInstance(){
    if (this.#instance){
      console.log('Already connected')
      return this.#instance
    } else 
      {this.#instance = new MongoSingleton()
      console.log('Connected')
      return this.#instance}
  }
}