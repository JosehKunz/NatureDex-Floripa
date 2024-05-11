const Usuario = require("../models/usuario")
const Local = require("../models/Local")

class UsuarioController {
    
   // MÉTODO GET PARA LISTAR TODOS OS USUARIOS (não estava no escopo inicial mas deixei para testes)

  async listar(req,res){

        /* #swagger.tags = ['Usuário'] */
        /* #swagger.summary = 'Fora do escopo inicial, mantive para testes' */
        /* #swagger.security = [{
            "BearerAuth": []
        }] */

    const listausuarios = await Usuario.findAll()
    res.json(listausuarios)
  }

  // MÉTODO POST
   async cadastrar(req, res) {

                /* #swagger.tags = ['Usuário'] */
                /* #swagger.summary = 'Cadastrar um novo usuário.' */
                /* #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Dados do novo usuário',
                    required: true,
                    schema: {
                        $email: "email_unico@natudex.com",
                        $password: "senha",
                        $nome: "Nome do usuário",
                        $cpf: "02494078093",
                        data_nascimento: "12-05-1989",
                        sexo:"M",
                        endereco: "insira aqui",
                        cep: "90810180"

                    }
                } */
                /* #swagger.responses[201] = {
                    description: 'Created',
                    schema: {
                        $ref: "#/definitions/Usuario"
                    }
                } */
                /* #swagger.responses[400] = {
                    description: 'Bad Request'
                } */
        try {
            console.log(req.body); 

            const email = req.body.email
            const password = req.body.password
            const nome = req.body.nome
            const data_nascimento = req.body.data_nascimento
            const cep = req.body.cep
            const cpf = req.body.cpf
            const sexo = req.body.sexo

            if (!nome) {
                return res.status(400).json({ message: 'O nome é obrigatório' })
            }

            if (sexo !== 'M' && sexo !== 'F') {
                return res.status(400).json({ message: 'O sexo deve ser M ou F' });
            }

            if (!data_nascimento) {
                return res.status(400).json({ message: 'A data de nascimento é um campo obrigatório' })
            }

            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ message: 'A data de nascimento precisa ser no formato ano-mês-dia' })
            }

            const usuario = await Usuario.create({
                email: email,
                password: password,
                nome: nome,
                data_nascimento: data_nascimento,
                cep: cep,
                cpf: cpf,
                sexo: sexo
            })

            res.status(201).json(usuario)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não consegui cadastrar o usuario, verifique se o cpf ou email já existem' })
        }
    }

        // DELETANDO UM USUARIO
        async deletar(req, res) {
            try {

                 /*  
                #swagger.tags = ['Usuário'],
                #swagger.summary = 'Deletar um usuário.',
                #swagger.security = [{
                    "BearerAuth": []
                }],
                #swagger.parameters['authorization'] = {
                    in: 'header',
                    description: 'Token de autenticação do usuário',
                    required: true
                },
                #swagger.parameters['email'] = {
                    in: 'path',
                    description: 'Email do usuário a ser deletado',
                    required: true
                },
                #swagger.responses[200] = {
                    description: 'Usuário deletado com sucesso'
                },
                #swagger.responses[400] = {
                    description: 'Erro ao deletar'
                },
                #swagger.responses[404] = {
                    description: 'Usuário não encontrado'
                },
                #swagger.responses[500] = {
                    description: 'Não foi possível deletar o usuário'
                }
                */


                const email = req.params.email; // Acessando o email fornecido pelo usuário na requisição
                const id_usuario = req.payload.sub; // Acessando o ID do usuário a partir do token no header

                // Verifica se há locais associados a este usuário
                const locaisAssociados = await Local.findAll({
                    where: {
                        id_usuario: id_usuario
                    }
                });

                // Se existirem locais associados, retorna os IDs dos locais
                if (locaisAssociados.length > 0) {
                    const idsLocais = locaisAssociados.map(local => local.id);
                    return res.status(400).json({ error: "O usuário não pode ser deletado pois existem locais associados a ele", locaisAssociados: idsLocais });
                }

                // Busca o usuário pelo email
                const usuario = await Usuario.findOne({
                    where: {
                        email: email
                    }
                });

                // Verifica se o usuário existe
                if (!usuario) {
                    return res.status(404).json({ message: "Usuário não encontrado" });
                }

                // Deleta o usuário
                await usuario.destroy();

                res.json({ message: "Usuário deletado com sucesso" });
            } catch (error) {
                console.log(error.message);
                res.status(500).json({ error: 'Não foi possível deletar o usuário' });
            }
        }

}

module.exports = new UsuarioController()

