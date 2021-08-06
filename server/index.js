const express = require('express')
const authRoute = require('./routes/auth')
const morgan = require('morgan')
const connectDB = require('./util/DBHelper')
const postRoute = require('./routes/post')
require('dotenv').config()

connectDB()

const app = express()

app.use(morgan(function (tokens, req, res) {
   return [
      '**************************************\n' +
      'Method: ' + tokens.method(req, res),
      '\nUrl   : ' + tokens.url(req, res),
      '\nStatus: ' + tokens.status(req, res),
      '\nLength: ' + tokens.res(req, res, 'content-length'),
      '\nTime  : ' + tokens['response-time'](req, res), 'ms'
   ].join(' ')
}))
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)


const PORT = 5000

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}!`);
})