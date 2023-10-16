import multer from 'multer'
import { __dirname } from '../utils/utils.js'

const ProductImageUploader = multer({
    storage: multer.diskStorage({
        destination: (req,file,cb) => cb(null,__dirname+'/public/img'),
        filename: (req,file,cb) => cb(null,file.originalname)
    })
})

const UserDocumentUploader = multer({
    storage: multer.diskStorage({
        destination: (req,file,cb) => cb(null,__dirname+`/src/documents/${req.user.id}`),
        filename: (req,file,cb) => cb(null, req.body.type)
    })
})

export default UserDocumentUploader