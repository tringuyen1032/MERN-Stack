const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
   const { username, password } = req.body
   if (!username || !password)
      return res
         .status(400)
         .json({ success: false, message: "Missing username or password" })

   try {
      //Check for existing user
      const user = await User.findOne({ username: username })

      if (user) {
         return res
            .status(400)
            .json({ success: false, message: "Username already exist" })
      }

      // All good
      const hashPassword = await argon2.hash(password)
      const newUser = new User({ username: username, password: hashPassword })
      await newUser.save()

      // Return token
      const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
      res.json({
         success: true,
         message: 'User created successfully',
         accessToken
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
   }
}

const login = async (req, res) => {
   const { username, password } = req.body
   if (!username || !password) {
      return res
         .status(401)
         .json({ success: false, message: 'Missing username or password' })
   }
   try {
      // Check for existing user
      const user = await User.findOne({ username: username })
      if (!user) {
         return res
            .status(400)
            .json({ success: false, message: 'Username or password incorrect' })
      }
      //Username found
      const passwordValid = await argon2.verify(user.password, password)
      if (!passwordValid) {
         return res
            .status(400)
            .json({ success: false, message: 'Username or password incorrect' })
      }
      const accessToken = jwt.sign(
         { userId: user._id },
         process.env.ACCESS_TOKEN_SECRET)

      res.json({
         success: true,
         message: `Welcome`,
         accessToken
      })
   } catch (error) {
      // console.log(error);
      return res
         .status(500)
         .json({ success: false, message: 'Internal server error' })
   }

}

module.exports = { login, register }