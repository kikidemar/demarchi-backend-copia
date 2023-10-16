import { model, Schema } from "mongoose"

let collection = 'tickets'

const schema = new Schema({
    purchase_date: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
})

export default model(collection,schema)