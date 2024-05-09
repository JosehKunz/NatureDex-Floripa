const { Router } = require("express");
const usuarioRoutes = require("./usuarios.route");
const localRoutes = require("./local.route");
const loginRoutes = require("./login.route");

const routes = Router()

routes.use('/local', localRoutes)
routes.use('/usuario', usuarioRoutes)
routes.use('/login', loginRoutes)

module.exports = routes