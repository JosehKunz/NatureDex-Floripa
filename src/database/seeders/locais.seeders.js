const { QueryInterface, Sequelize } = require("sequelize");
const local = require("../../models/Local");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await local.bulkCreate([
            {       
                    id_usuario:1,
                    nome : "Local 1",
                    descricao : "Joaquina",
                    cep: "88010510"
            },
            {       
                id_usuario:1,
                nome : "Local 2",
                descricao : "Lagoa do Peri",
                cep: "88066000"
            },
            {       
                id_usuario:2,
                nome : "Local 3",
                descricao : "Dunas do Santinho",
                cep: "88058700"
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await local.destroy({
            nome: [
                "Local 1", 
                "Local 2",
                "Local 3"
            ] 
        })
    }
}