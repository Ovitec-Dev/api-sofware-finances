module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').DataTypes} Sequelize
     */
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('budgets', {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        total_amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        period: {
          type: Sequelize.ENUM('weekly', 'monthly', 'annual'),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
      await queryInterface.dropTable('budgets');
    },
  };