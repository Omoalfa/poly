module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tx_sub_task', 'order', { type: Sequelize.STRING, after: 'status' })
  },
};  