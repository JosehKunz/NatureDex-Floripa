const { Router } = require('express') 
const LoginController = require('../controllers/loginController')

const loginRoutes = new Router()

loginRoutes.post('/', LoginController.login)

module.exports = loginRoutes
