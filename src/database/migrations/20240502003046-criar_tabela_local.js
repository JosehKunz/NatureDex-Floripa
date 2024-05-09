'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'locais',
      {

        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        id_usuario: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      nome: {
          type: Sequelize.STRING,
          allowNull: false
      },
      descricao: {
          type: Sequelize.STRING,
          allowNull:true
      },
      localidade: {
          type: Sequelize.STRING,
          allowNull: true
      },
      cep: {
          type: Sequelize.STRING,
          allowNull:false
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
  await queryInterface.dropTable('locais');
}
};
