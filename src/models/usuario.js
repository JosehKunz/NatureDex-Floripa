const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')


// Perfil do registro dos usuários

const Usuario = connection.define('usuarios', {

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // o sexo será uma string composta de 1 letra, deve ser M ou F
    sexo: {
        type: DataTypes.STRING(1),
        allowNull: false
    },

    // obrigaremos o e-mail a ser um campo único para que o programa fique melhor
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    cep: {
        type:DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type:DataTypes.STRING,
        allowNull: true

    }
})

module.exports = Usuario