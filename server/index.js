const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const morgan = require('morgan')
require('dotenv').config()

const connectDB = async () => {
   try {
      await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yqpdz.mongodb.net/first_project?retryWrites=true&w=majority`, {
         useCreateIndex: true,
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false
      })
      console.log('MongoDB connected');
   } catch (error) {
      console.log(error)
      process.exit(1)
   }
}
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


const PORT = 5000

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}!`);
})