'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tx_project_files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING,
      },
      size:{
        type:Sequelize.DECIMAL(11,2)
      },
      type:{
        type:Sequelize.STRING
      },
      data:{
        type:Sequelize.BLOB
      },
      project_id:{
        type: Sequelize.INTEGER,
      },
      task_id:{
        type: Sequelize.INTEGER,
      },
      created_by: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tx_project_files');
  }
};