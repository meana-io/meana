'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );

    await queryInterface.createTable('node_packages', {
      time: {
        type: 'TIMESTAMPTZ',
      },
      nodeUuid: {
        type: DataTypes.STRING,
      },
      packageName: {
        type: DataTypes.STRING,
      },
      packageVersion: {
        type: DataTypes.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('node_packages');
  },
};
