module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} Sequelize
   */
  async up(queryInterface) {
    await queryInterface.bulkInsert('sub_categories', [
      {
        name: 'Groceries',
        category_id: 1, // Asegúrate de que estos ID existan en la tabla de categorías
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Public Transport',
        category_id: 2, // Asegúrate de que estos ID existan en la tabla de categorías
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.bulkDelete('sub_categories', null, {});
  }
};
