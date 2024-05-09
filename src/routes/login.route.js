const { Router } = require('express') 
const LoginController = require('../controllers/loginController')

const loginRoutes = new Router()

loginRoutes.post('/', LoginController.login)

loginRoutes.get('/bem_vindo', (req, res) => {
    res.json({ name: 'Bem vindo' })
})

module.exports = loginRoutes
