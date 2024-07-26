module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} Sequelize
   */
  async up(queryInterface) {
    await queryInterface.bulkInsert('transactions', [
      {
        type: 'income',
        amount: 1000.0,
        user_id: 1, // Asegúrate de que estos ID existan en la tabla de usuarios
        category_id: 1, // Asegúrate de que estos ID existan en la tabla de categorías
        sub_category_id: 1, // Asegúrate de que estos ID existan en la tabla de subcategorías
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type: 'expense',
        amount: 50.0,
        user_id: 1, // Asegúrate de que estos ID existan en la tabla de usuarios
        category_id: 2, // Asegúrate de que estos ID existan en la tabla de categorías
        sub_category_id: 2, // Asegúrate de que estos ID existan en la tabla de subcategorías
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
