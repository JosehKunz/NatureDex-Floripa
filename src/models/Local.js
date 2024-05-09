const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')


// Perfil do registro dos usuários

const local = connection.define('locais', {
// importante que tenha o id do usuário dono deste registro.
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull:true
    },
    localidade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cep: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

module.exports = local