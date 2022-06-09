'use strict';

const {DataTypes} = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('node_disks', {
        time: {
          primaryKey: true,
          type: 'TIMESTAMPTZ',
        },
        nodeId: {
          type: Sequelize.STRING
        },
        path: {
          type: Sequelize.STRING
        },
        manufacture: {
          type: Sequelize.STRING
        },
        model: {
          type: Sequelize.STRING
        },
        serialNumber: {
          type: Sequelize.STRING
        },
        capacity: {
          type: Sequelize.STRING
        },
        firmwareVersion: {
          type: Sequelize.STRING
        },
      });
      await transaction.commit()
    } catch (e) {
      await transaction.rollback()
    }

    const transaction2 = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query("SELECT create_hypertable('node_disks','time');")
      await transaction.commit()
    } catch (e) {
      await transaction2.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('node_disks');
  }
};
