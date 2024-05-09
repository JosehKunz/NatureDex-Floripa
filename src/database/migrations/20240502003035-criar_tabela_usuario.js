'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usuarios',
      {

        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    // o sexo será uma string composta de 1 letra, deve ser M ou F
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    // obrigaremos o e-mail a ser um campo único para que o programa fique melhor
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    cep: {
        type:Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type:Sequelize.STRING,
        allowNull: true

    },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('usuarios');
}
};
