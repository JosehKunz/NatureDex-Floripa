const { QueryInterface, Sequelize } = require("sequelize");
const usuario = require("../../models/usuario");

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await usuario.bulkCreate([
            {
                nome : "José Oswaldo Kunz neto",
                sexo: "M",
                email : "josekunz@gmail.com",
                password: "zebra",
                cpf: "02495096503",
                cep: "90810180",
                data_nascimento: "1989-12-09",
                endereco: "Armação"
            },
            {
                nome : "Maria Antonieta",
                sexo: "F",
                email : "mff@gmail.com",
                password: "zebra",
                cpf: "02495096507",
                cep: "90810181",
                data_nascimento: "2020-12-09",
                endereco: "Ingleses"
            },
            {
                nome : "Mario Quintino",
                sexo: "M",
                email : "quintinissimo@gmail.com",
                password: "zebra",
                cpf: "02595096507",
                cep: "90811181",
                data_nascimento: "1943-12-09",
                endereco: "Centro"
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await usuario.destroy({
            email: [
                "quintinissimo@gmail.com", 
                "mff@gmail.com",
                "josekunz@gmail.com"
            ] 
        })
    }
}