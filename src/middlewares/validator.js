function validator (req,res,next) {
  const { name, password, email} = req.body
  if (!name || !password || !email) {
    return res.status(400).json({
      success: false,
      message: 'name, password, email are required'
    })
  } else {
    next()
  }
}

export default validator