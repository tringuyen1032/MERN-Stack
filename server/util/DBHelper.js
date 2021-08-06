const mongoose = require('mongoose')

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.DB_URL, {
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

module.exports = connectDB