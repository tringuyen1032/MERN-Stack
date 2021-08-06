const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
   const authHeader = req.header('Authorization')
   const token = authHeader && authHeader.split(' ')[1]

   if (!token) {
      return res
         .status(401)
         .json({
            status: false,
            message: 'Access token not found'
         })
   }
   try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.userId = decoded.userId
      next()
   } catch (error) {
      return res.status(403).json({
         status: false,
         message: "Internal server error"
      })
   }
}

module.exports = verifyToken