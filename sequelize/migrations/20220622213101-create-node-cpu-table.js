'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('node_cpu', {
        time: {
          type: 'TIMESTAMPTZ',
        },
        nodeId: {
          type: Sequelize.STRING
        },
        frequency: {
          type: Sequelize.STRING
        },
        coresQuantity: {
          type: Sequelize.STRING
        },
        manufacture: {
          type: Sequelize.STRING
        },
        model: {
          type: Sequelize.STRING
        },
        usage: {
          type: Sequelize.STRING
        },
      });
      await transaction.commit()
    } catch (e) {
      await transaction.rollback()
    }

    const transaction2 = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query("SELECT create_hypertable('node_cpu','time');")
      await transaction.commit()
    } catch (e) {
      await transaction2.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('node_cpu');
  }
};
