const Local = require("../models/Local");
const Usuario = require("../models/usuario");

const { default: axios } = require('axios')
const { getCepCoordinates, openStreetMap } = require('../service/map.service')
const { gerarLinkGoogleMaps } = require('../service/googleMaps.service.js')

class localController {

    // LISTAR


    async listar(req, res) {
      try {

            /*  
    #swagger.tags = ['Local']
    #swagger.parameters['authorization'] = {
      in: 'header',
      description: 'Token de autenticação do usuário',
      required: true
    }
    */

          const id_usuario = req.payload.sub; // Acessando o ID do usuário a partir do token JWT

          const locais = await Local.findAll({
              where: {
                  id_usuario: id_usuario
              }
          });

          res.json(locais);
      } catch (error) {
          console.log(error.message);
          res.status(500).json({ error: 'Não foi possível listar os locais' });
      }
  }
      
  // CADASTRAR LOCAL, ID DO USUÁRIO VINDO AUTOMÁTIC

  async cadastrar(req, res) {
    try {

                       /* #swagger.tags = ['Local'] */
        /* #swagger.summary = 'Cadastrar um novo local.' */
        /* #swagger.security = [{
            "BearerAuth": []
        }] */
        /* #swagger.parameters['authorization'] = {
            in: 'header',
            description: 'Token de autenticação do usuário',
            required: true
        } */
        /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Dados do novo local',
            required: true,
            schema: {
                $nome: "Nome do local",
                $descricao: "Descrição do local",
                $cep: "88066000"
            }
        } */
        /* #swagger.responses[201] = {
            description: 'Created',
            schema: {
                $ref: "#/definitions/Local"
            }
        } */
        /* #swagger.responses[400] = {
            description: 'nome, cep e descrição são obrigatórios'
        } */
        /* #swagger.responses[500] = {
            description: 'Não foi possível cadastrar o local, tente outro CEP'
        } */

      const nome = req.body.nome;
      const descricao = req.body.descricao;
      const cep = req.body.cep;
      let localidade = req.body.localidade; 
      const id_usuario = req.payload.sub;
  
      if (!cep || !nome || !descricao) {
        return res.status(400).json({ message: 'nome, cep e descrição são obrigatórios' });
      }
  
      let resposta = await openStreetMap(cep);
      localidade = resposta.display_name; // Atribuindo o valor de display_name para a localidade
      localidade = localidade.substring(10, 260);  // A localidade é salva sem o primeiro trecho relativo ao CEP

      const cadastrarlocal = await Local.create({
        nome: nome,
        descricao: descricao,
        cep: cep,
        localidade: localidade,
        id_usuario: id_usuario
      });
  
      res.status(201).json(cadastrarlocal);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Não foi possível cadastrar o local, tente outro CEP' });
    }
  }


    // LISTANDO UM LOCAL




    async listarUm(req, res) {
      try {

                    /* #swagger.tags = ['Local'] */
        /* #swagger.summary = 'Buscar informações de um local específico.' */
        /* #swagger.security = [{
            "BearerAuth": []
        }] */
        /* #swagger.parameters['authorization'] = {
            in: 'header',
            description: 'Token de autenticação do usuário',
            required: true
        } */
        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do local a ser buscado',
            required: true,
            type: 'integer'
        } */
        /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
                $ref: "#/definitions/Local"
            }
        } */
        /* #swagger.responses[404] = {
            description: 'Not Found',
            schema: {
                message: "Local não encontrado"
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Não foi possível buscar o local'
        } */

          const id = req.params.id;
          const id_usuario = req.payload.sub; // Acessando o ID do usuário a partir do token JWT
  
          const local = await Local.findOne({
              where: {
                  id: id,
                  id_usuario: id_usuario
              }
          });
  
          if (!local) {
              return res.status(404).json({ message: "Local não encontrado" });
          }
  
          // Obtém as coordenadas da localidade
          const { lat, lon } = await getCepCoordinates(local.cep);
  
          // Gera o link do Google Maps com base nas coordenadas
          const linkGoogleMaps = await gerarLinkGoogleMaps(lat, lon);
  
          // Adiciona o link ao objeto do local  
          res.json({ local, linkGoogleMaps });


      } catch (error) {
          console.log(error.message);
          res.status(500).json({ error: 'Não foi possível buscar o local' });
      }
  }
  
  

  //DELETANDO UM LOCAL
  async deletar(req, res) {
    try {

                    /* #swagger.tags = ['Local'] */
        /* #swagger.summary = 'Deletar um local existente.' */
        /* #swagger.security = [{
            "BearerAuth": []
        }] */
        /* #swagger.parameters['authorization'] = {
            in: 'header',
            description: 'Token de autenticação do usuário',
            required: true
        } */
        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do local a ser deletado',
            required: true,
            type: 'integer'
        } */
        /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
                message: "Local deletado com sucesso"
            }
        } */
        /* #swagger.responses[404] = {
            description: 'Not Found',
            schema: {
                message: "Local não encontrado"
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Não foi possível deletar o local'
        } */

        const id = req.params.id;
        const id_usuario = req.payload.sub; // Acessando o ID do usuário a partir do token 

        const local = await Local.findOne({
            where: {
                id: id,
                id_usuario: id_usuario
            }
        });

        if (!local) {
            return res.status(404).json({ message: "Local não encontrado" });
        }

        const nomeLocal = local.nome; // Obtendo o nome do local antes de deletá-lo

        await local.destroy();
        res.json({ message: `Local '${nomeLocal}' (ID: ${id}) deletado com sucesso` });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível deletar o local' });
    }
}


// ATUALIZANDO UM LOCAL
async atualizar(req, res) {
  try {

         /* #swagger.tags = ['Local'] */
        /* #swagger.summary = 'Atualizar um local existente.' */
        /* #swagger.security = [{
            "BearerAuth": []
        }] */
        /* #swagger.parameters['authorization'] = {
            in: 'header',
            description: 'Token de autenticação do usuário',
            required: true
        } */
        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID do local a ser atualizado',
            required: true,
            type: 'integer'
        } */
        /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Dados atualizados do local',
            required: true,
            schema: {
                nome: "Novo nome",
                descricao: "Nova descrição",
                cep: "88066000",
                localidade: "Localidade atualizada do local"
            }
        } */
        /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
                $ref: "#/definitions/Local"
            }
        } */
        /* #swagger.responses[404] = {
            description: 'Local não encontrado',
            schema: {
                $ref: "#/definitions/Error"
            }
        } */
        /* #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: {
                $ref: "#/definitions/Error"
            }
        } */


      const { id } = req.params;
      const { nome, descricao, cep, localidade } = req.body;
      const id_usuario = req.payload.sub; // Acessando o ID do usuário a partir do token JWT

      const local = await Local.findOne({
          where: {
              id: id,
              id_usuario: id_usuario
          }
      });

      if (!local) {
          return res.status(404).json({ message: "Local não encontrado" });
      }

      // Atualiza apenas as propriedades fornecidas no corpo da requisição
      if (nome) local.nome = nome;
      if (descricao) local.descricao = descricao;
      if (cep) local.cep = cep;
      if (localidade) local.localidade = localidade;

      await local.save();

      res.json(local);
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Não foi possível atualizar o local' });
  }
}


async pegarmapa(req, res) {
    try {

                  /* #swagger.tags = ['Local'] */
      /* #swagger.summary = 'Buscar mapa de um local específico' */
      /* #swagger.security = [{
          "BearerAuth": []
      }] */
      /* #swagger.parameters['authorization'] = {
          in: 'header',
          description: 'Token de autenticação do usuário',
          required: true
      } */
      /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID do local a ser buscado',
          required: true,
          type: 'integer'
      } */
      /* #swagger.responses[200] = {
          description: 'OK',
          schema: {
              $ref: "#/definitions/Local"
          }
      } */
      /* #swagger.responses[404] = {
          description: 'Not Found',
          schema: {
              message: "Local não encontrado"
          }
      } */
      /* #swagger.responses[500] = {
          description: 'Não foi possível buscar o local'
      } */

        const id = req.params.id;
        const id_usuario = req.payload.sub; // Acessando o ID do usuário a partir do token JWT

        const local = await Local.findOne({
            where: {
                id: id,
                id_usuario: id_usuario
            }
        });

        if (!local) {
            return res.status(404).json({ message: "Local não encontrado" });
        }

        // Obtém as coordenadas da localidade
        const { lat, lon } = await getCepCoordinates(local.cep);

        // Gera o link do Google Maps com base nas coordenadas
        const linkGoogleMaps = await gerarLinkGoogleMaps(lat, lon);

        // Adiciona o link ao objeto do local  
        res.json({ linkGoogleMaps });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Não foi possível buscar o local' });
    }
}





}

module.exports = new localController();
