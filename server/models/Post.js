const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
   tittle: {
      type: 'string',
      required: true
   },
   description: {
      type: 'string'
   },
   url: {
      type: 'string'
   },
   status: {
      type: 'string',
      enum: ['TO lEARN', 'LEARNING', 'LEARNED']
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
   }
})

module.exports = mongoose.model('posts', PostSchema)