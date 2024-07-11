module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').DataTypes} Sequelize
     */
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('sub_categories', {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        category_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          references: {
            model: 'categories',
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
      await queryInterface.dropTable('sub_categories');
    },
  };