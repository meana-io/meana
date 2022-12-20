'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('node_ram_sticks', {
        time: {
          type: 'TIMESTAMPTZ',
        },
        nodeUuid: {
          type: Sequelize.STRING,
        },
        arrayHandle: {
          type: Sequelize.STRING,
        },
        errorInformationHandle: {
          type: Sequelize.STRING,
        },
        totalWidth: {
          type: Sequelize.STRING,
        },
        dataWidth: {
          type: Sequelize.STRING,
        },
        size: {
          type: Sequelize.STRING,
        },
        formFactor: {
          type: Sequelize.STRING,
        },
        ramSet: {
          type: Sequelize.STRING,
        },
        locator: {
          type: Sequelize.STRING,
        },
        bankLocator: {
          type: Sequelize.STRING,
        },
        type: {
          type: Sequelize.STRING,
        },
        typeDetail: {
          type: Sequelize.STRING,
        },
        speed: {
          type: Sequelize.STRING,
        },
        manufacturer: {
          type: Sequelize.STRING,
        },
        serialNumber: {
          type: Sequelize.STRING,
        },
        assetTag: {
          type: Sequelize.STRING,
        },
        partNumber: {
          type: Sequelize.STRING,
        },
        rank: {
          type: Sequelize.STRING,
        },
        configuredMemorySpeed: {
          type: Sequelize.STRING,
        },
        minimumVoltage: {
          type: Sequelize.STRING,
        },
        maximumVoltage: {
          type: Sequelize.STRING,
        },
        configuredVoltage: {
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
        "SELECT create_hypertable('node_ram_sticks','time');"
      );
      await transaction.commit();
    } catch (e) {
      await transaction2.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('node_ram_sticks');
  },
};
