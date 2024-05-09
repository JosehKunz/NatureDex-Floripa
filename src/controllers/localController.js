const Local = require("../models/Local");
const Usuario = require("../models/usuario");

const { default: axios } = require('axios')
const { getCepCoordinates, openStreetMap } = require('../service/map.service')
const { gerarLinkGoogleMaps } = require('../service/googleMaps.service.js')

class localController {

    // LISTAR
    async listar(req, res) {
      try {
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
      
  // CADASTRAR LOCAL, ID DO USUÁRIO VINDO AUTOMÁTICO

  async cadastrar(req, res) {
    try {
      const nome = req.body.nome;
      const descricao = req.body.descricao;
      const cep = req.body.cep;
      let localidade = req.body.localidade; // Alteração aqui
      const id_usuario = req.payload.sub;
  
      if (!cep || !nome || !descricao) {
        return res.status(400).json({ message: 'nome, cep e descrição são obrigatórios' });
      }
  
      let resposta = await openStreetMap(cep);
      localidade = resposta.display_name; // Atribuindo o valor de display_name para a localidade
      localidade = localidade.substring(10, 260);  // Talvez não seja o idela, mas assim a localidade é salva sem o primeiro trecho relativo ao CEP

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
      res.status(500).json({ error: 'Não foi possível cadastrar o local' });
    }
  }


    // LISTANDO UM LOCAL
    async listarUm(req, res) {
      try {
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

}

module.exports = new localController();
