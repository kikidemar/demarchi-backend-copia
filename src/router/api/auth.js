import { Router } from 'express'
// import User from '../../models/User.js'
import validator from '../../middlewares/validator.js'
import pass_is_8 from '../../middlewares/pass_is_8.js'
import createToken from '../../middlewares/createToken.js'
import create_hash from '../../middlewares/create_hash.js'
// import is_valid_pass from '../../middlewares/is_valid_pass.js'
import passport from 'passport'
import validator_signin from '../../middlewares/validator_signin.js'
import passIsOk from '../../middlewares/passIsOk.js'
import passport_call from '../../middlewares/passport_call.js'
import AuthController from '../../controllers/auth.controller.js'
import compression from 'express-compression'
import User from "../../dao/Mongo/models/User.js"
import sendMail from '../../utils/sendMail.js'
import config from '../../config/config.js'
import Jwt from 'jsonwebtoken'
import { logger } from '../../config/logger.js'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'

const auth_router = Router()
auth_router.use(compression({
  brotli:{enabled: true,
          zlib: {}}
}))

// Sign Up

auth_router.post(
  '/register', 
  validator, 
  pass_is_8, 
  create_hash, 
  passport.authenticate(
    'register',
    { failureRedirect: 'api/auth/fail-register'}
  ), 
  AuthController.register
)


auth_router.get('/fail-register', AuthController.failRegister)



// Sign In

auth_router.post(
  '/login',
  validator_signin,
  pass_is_8,
  passport.authenticate('login', { failureRedirect: '/api/auth/fail-login'}), 
  passIsOk,
  createToken,
  AuthController.login)


auth_router.get('/fail-login', AuthController.failLogin)



// Sign out

// auth_router.post('/signout',async(req,res,next)=>{
//   try {
//       if (req.session.email) {
//           req.session.destroy()
//           return res.status(200).json({
//               success: true,
//               message: 'user signed out!'
//           })
//       } else {
//           return res.status(404).json({
//               success: false,
//               message: 'user not found!'
//           })
//       }
//   } catch (error) {
//       next(error)
//   }
// })

auth_router.post(
    '/signout', 
    passport_call('jwt',{session:false}),
    AuthController.signOut
    )



auth_router.get('/github', passport.authenticate('github', { scope:['user:email']}), (req, res) => {})

auth_router.get(
  '/github/callback', 
  passport.authenticate('github', { failureRedirect:'/api/auth/fail-register-github'}),
  (req, res) => res.status(200).redirect('/')
)

auth_router.get('/fail-register-github', (req,res)=> res.status(400).json({
  success: false,
  message:'Error auth'
}))

auth_router.get("/current", passport_call("jwt"), AuthController.current)


auth_router.post('/forgot-pass', async (req,res)=> {
  const { email } = req.body;
  // Find user by email in the database
  let userDB = await User.findOne({ email: email })
  if (!userDB) {
    return res.status(404).send("User not found");
  }

  // Generate a JWT token for password reset (expires in 1 hour)
  const token = Jwt.sign({ email: userDB.email }, config.privateKeyJwt, { expiresIn: "1h" });

  // Send the reset link to the user's email
  const subject = 'Reset Password'
  const html = `
  <p>Welcome ${userDB.name}</p>
  <p>Click <a href='http://localhost:8080/reset-pass.html?token=${token}'>Here</a> to reset password</p>
  <p>This link expires in one hour</p>
  `
  await sendMail(email, subject, html)
  res.send({status: 'success', message: 'Mail sent successfully'})

})

auth_router.get('/reset-pass', (req, res) => {
  const token = req.query.token
  

  Jwt.verify(token, config.privateKeyJwt,  (err, credencials) => {
    if (err) {
      return res.status(401).send("Invalid or expired token");
    }

    // Render the password reset form
    res.render("reset-pass", { token });
  });
})

auth_router.post('/reset-pass', async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    Jwt.verify(token, config.privateKeyJwt, async (err, credentials) => {
      if (err) {
        return res.status(401).json({message:'Invalid or expired token'});
      }

      try {
        let user = await User.findOne({ email: credentials.email });
        if (!user) {
          return res.status(404).json({message:'User not found'});
        }

        if (newPassword !== confirmPassword) {
          return res.status(400).json({message:'Passwords do not match'});
        }
        
        if (compareSync(newPassword, user.password)) return res.status(400).json({message: 'The new password cannot be the same as the old one'})

        user.password = hashSync(newPassword, genSaltSync())
        await user.save();

        res.json({message:'Password reset successful'});
      } catch (error) {
        logger.error(error.message);
        res.status(500).json({message:'An error occurred on the server'});
      }
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message:'An error occurred on the server'});
  }
});



export default auth_router