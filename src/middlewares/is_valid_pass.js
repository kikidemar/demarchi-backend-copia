import { compareSync } from "bcrypt";
// import User from '../models/User.js'

export default async function(req,res,next) {
    //let user = await User.findOne({ email:req.body.email })
    //console.log(user)
    //console.log(req.body)

        let verified = compareSync(
            req.body.password,      //lo que envía el cliente en el form
            req.user.password           //lo que está guardado en mongo
        )
        if (verified) {
            return next()
        }
    
    return res.status(401).json({
        success:false,
        message: 'Password or email mismatch!'
    })
}