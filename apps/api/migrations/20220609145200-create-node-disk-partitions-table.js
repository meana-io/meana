'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('node_disk_partitions', {
        time: {
          type: 'TIMESTAMPTZ',
        },
        nodeDiskId: {
          type: Sequelize.STRING
        },
        path: {
          type: Sequelize.STRING
        },
        usedSpace: {
          type: Sequelize.STRING
        },
        capacity: {
          type: Sequelize.STRING
        },
        serialNumber: {
          type: Sequelize.STRING
        },
        fileSystem: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING
        },
      });
      await transaction.commit()
    } catch (e) {
      await transaction.rollback()
    }

    const transaction2 = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query("SELECT create_hypertable('node_disk_partitions','time');")
      await transaction.commit()
    } catch (e) {
      await transaction2.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('node_disks');
  }
};
