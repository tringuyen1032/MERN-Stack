const express = require('express')
const router = express.Router()
const {
   createPost, 
   getPost, 
   updatePost,
   deletePost
} = require('../controllers/post')
const verifyToken = require('../middleware/auth')

router.route('/').post(verifyToken, createPost)
router.route('/').get(verifyToken, getPost)
router.route('/:id').put(verifyToken, updatePost)
router.route('/:id').delete(verifyToken, deletePost)

module.exports = router