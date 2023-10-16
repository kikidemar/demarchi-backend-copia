class AuthController {

  register = async(req,res,next)=> {
  
    try {
      res.status(201).json({
      success: true,
      message: 'user created!'
      })
  } catch (error) {
      return next(error)
    } 
  }

  failRegister = (req, res) => { res.status(400).json({
    success:false,
    message: ' Error auth'
  })}

  login = (req, res, next) => {
    try {
      // const {email} = req.body
      // req.session.email = email
      // req.session.role = req.user.role
      const {cid, _id, email, role} = req.user

      return res.status(200).cookie('token',req.token,{maxAge:60*60*1000})
                            .cookie('cid', cid, { maxAge: 60 * 60 * 1000 })
                            .cookie('email', email,{ maxAge: 60 * 60 * 1000 })
                            .cookie('role', role,{ maxAge: 60 * 60 * 1000 })
                            .cookie('_id', _id,{ maxAge: 60 * 60 * 1000 })
                            .json({
                              success: true,
                              message: 'User logged in!'
                          })
                      } 
   catch (err) {
    next(err)
  }
  }

  failLogin = (req, res) => { res.status(400).json({
    success:false,
    message: 'Error auth'
  })}

  signOut = (req,res)=> res.status(200).clearCookie('token').clearCookie('_id').clearCookie('role').clearCookie('cid').clearCookie('email').json({
    success:true,
    message: 'Siggned out!'
  })

  current = async (req, res, next) => {
    const data = await jwt.verify(req.cookies.token, process.env.SECRET_JWT, async (error, credentials) => {
        if (error) return { message: "error to get token credentials" }
        return credentials
    })
    return res.status(200).json(data)
  }

}

export default new AuthController()