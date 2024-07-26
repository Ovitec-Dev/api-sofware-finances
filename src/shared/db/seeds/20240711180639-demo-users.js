module.exports = {
  /** @type {import('sequelize-cli').Migration} */
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} Sequelize
   */
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'test@example.com',
        password: 'hashed_password', // Recuerda que la contraseña debe estar hasheada
        user_name: 'Test User',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'admin@example.com',
        password: 'hashed_password', // Recuerda que la contraseña debe estar hasheada
        user_name: 'Admin User',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
