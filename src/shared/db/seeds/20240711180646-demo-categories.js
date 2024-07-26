module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} Sequelize
   */
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Food',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Transport',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
