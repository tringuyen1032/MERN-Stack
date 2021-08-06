const express = require('express')
const router = express.Router()
let {login, register} = require('../controllers/auth')

// router.route('/').get(login)
router.route('/register').post(register)
router.route('/login').post(login)

module.exports = router