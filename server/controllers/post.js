const Post = require('../models/Post')

const createPost = async (req, res) => {
   const { title, description, url, status } = req.body

   //Simple validation
   if (!title)
      return res
         .status(400)
         .json({ success: false, message: 'Title is required' })

   try {
      const newPost = new Post({
         title: title,
         description: description || '',
         url: (url.startsWith('https://') ? url : `https://${url}`) || '',
         status: status || 'TO LEARN',
         user: req.userId
      })

      await newPost.save()

      res.json({ success: true, message: 'Happy learning!', post: newPost })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
   }
}

const getPost = async (req, res) => {
   try {
      const posts = await Post
         .find({ user: req.userId })
         .populate('user', ['username'])
      res.json({
         success: true,
         posts
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
   }
}

const updatePost = async (req, res) => {
   const { title, description, url, status } = req.body
   if (!title) {
      return res
         .status(404)
         .json({
            success: false,
            message: 'Title is required'
         })
   }
   try {
      let updatePost = ({
         title: title,
         description: description || '',
         url: (url.startsWith('https://') ? url : `https://${url}`) || '',
         status: status || 'TO LEARN'
      })
      const postUpdateCondition = {
         _id: req.params.id,
         user: req.userId
      }
      updatePost = await Post.findOneAndUpdate(postUpdateCondition,
         updatePost,
         { new: true })
      //user not authorized to update post
      if (!updatePost) {
         return res
            .status(401)
            .json({ status: false, message: 'Post not found or user not authorized' })
      }
      res.json({ status: true, message: 'Update successfully', post: updatePost })
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' })
   }
}

const deletePost = async (req, res) => {
   try {
      const postDeleteCondition = { _id: req.params.id, user: req.userId }
      const deletePost = await Post.findOneAndDelete(postDeleteCondition)
      if (!deletePost) {
         return res
            .status(401)
            .json({ status: false, message: 'Post not found or user not authorized' })
      }
      res.json({ status: true, message: 'Delete successfully', post: deletePost })
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' })
   }
}

module.exports = { createPost, getPost, updatePost, deletePost }