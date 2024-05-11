const { Router } = require('express') 
const { auth } = require('../middleware/auth')
const { validarUsuario } = require('../middleware/validacaoUsuario_YUP');


const UsuarioController = require('../controllers/UsuarioController')



const usuarioRoutes = new Router()

usuarioRoutes.post('/', validarUsuario, UsuarioController.cadastrar)
usuarioRoutes.get('/', auth, UsuarioController.listar)
usuarioRoutes.delete('/:email', auth, UsuarioController.deletar)

module.exports = usuarioRoutes