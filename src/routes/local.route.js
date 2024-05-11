const { Router } = require('express') 
const { auth } = require('../middleware/auth')

const localController = require('../controllers/localController')

const localRoutes = new Router()

localRoutes.post('/', auth,localController.cadastrar)
localRoutes.get('/', auth, localController.listar)
localRoutes.get('/:id', auth, localController.listarUm)
localRoutes.delete('/:id', auth, localController.deletar)
localRoutes.put('/:id', auth, localController.atualizar)
localRoutes.get('/:id/maps', auth, localController.pegarmapa)

module.exports = localRoutes