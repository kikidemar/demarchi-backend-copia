import verifyToken from './auth.js'

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req,res, ()=>{
    if (req.user.role === 'admin'){
      next()
    }else {
      res.status(403).json({message: 'You are not allowed to access this'})
    }
  })
}

export default verifyTokenAndAdmin