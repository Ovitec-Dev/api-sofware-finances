module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      google_id: {
        type: Sequelize.STRING(555),
        allowNull: true,
      },
      user_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      profile_picture: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      auth_provider: {
        type: Sequelize.ENUM('local', 'google'),
        allowNull: false,
        defaultValue: 'local',
      },
      reset_token: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      reset_token_expiration: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      email_verified: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      email_verification_token: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   */
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
