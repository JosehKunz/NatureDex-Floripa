const Usuario = require("../models/usuario")
const { sign } = require('jsonwebtoken')

class loginController {

    async login(req, res) {
        try {

            /*  
            #swagger.tags = ['Login (pegue o token)'],
            #swagger.summary = 'Realizar login de usuário.',
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Dados de login do usuário',
                required: true,
                schema: {
                    email: "josekunz@gmail.com",
                    password: "zebra"
                }
            },
            #swagger.responses[200] = {
                description: 'OK',
                schema: {
                    type: 'object',
                    properties: {
                        Token: {
                            type: 'string'
                        }
                    }
                }
            },
            #swagger.responses[400] = {
                description: 'Os campos são obrigatórios'
            },
            #swagger.responses[404] = {
                description: 'Não localizamos registro com estes dados!'
            },
            #swagger.responses[500] = {
                description: 'Poxa.. algo deu errado!'
            }
            */


            const email = req.body.email
            const password = req.body.password

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' })
            }

            if (!password) {
                return res.status(400).json({ message: 'O password é obrigatório' })
            }

            const usuario = await Usuario.findOne({
                where: { email: email, password: password }
            })

            if (!usuario) {
                return res.status(404).json({ error: 'Não localizamos registro com estes dados!' })
            }

            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome }

            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({ Token: token })

        } catch (error) {
            return res.status(500).json({ error: error, message: 'Poxa.. algo deu errado!' })
        }
    }
}

module.exports = new loginController()