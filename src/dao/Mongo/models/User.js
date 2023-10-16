import { Schema, model, mongoose, Types} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'users'
const schema = new mongoose.Schema({
  name: {type: String, required: true},
  last_name: { type: String, required: false },
  photo: {type: String, default:'https://www.pngitem.com/pimgs/m/227-2271053_usuario-persona-genrico-solo-general-smbolo-user-clipart.png'},
  email: {type: String, required: true, index: true, unique: true},
  age: {type:Number},
  role: { type: String, enum: ["user", "admin", "premium"], default: "user"},
  password: {type:String, required:true},
  cid: { type: Types.ObjectId, ref: 'carts', unique: true },
  documents: [new mongoose.Schema({
    name: {type: String},
    reference: {type: String}
})],
  last_connection: {type: Date}
})

schema.plugin(mongoosePaginate)

const User = mongoose.model(collection, schema)

export default User