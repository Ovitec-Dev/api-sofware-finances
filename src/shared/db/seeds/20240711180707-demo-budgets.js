module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} Sequelize
   */
  async up(queryInterface) {
    await queryInterface.bulkInsert('budgets', [
      {
        total_amount: 500.0,
        category: 'Food',
        period: 'monthly',
        user_id: 1, // Asegúrate de que estos ID existan en la tabla de usuarios
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        total_amount: 200.0,
        category: 'Transport',
        period: 'monthly',
        user_id: 1, // Asegúrate de que estos ID existan en la tabla de usuarios
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.bulkDelete('budgets', null, {});
  }
};
