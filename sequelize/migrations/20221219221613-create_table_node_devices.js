'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('node_devices', {
        time: {
          type: 'TIMESTAMPTZ',
        },
        nodeUuid: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        port: {
          type: Sequelize.STRING,
        },
      });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
    }

    const transaction2 = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query(
        "SELECT create_hypertable('node_devices','time');"
      );
      await transaction.commit();
    } catch (e) {
      await transaction2.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('node_devices');
  },
};
