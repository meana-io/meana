'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );

    await queryInterface.createTable('node_users', {
      time: {
        type: 'TIMESTAMPTZ',
      },
      nodeUuid: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      groups: {
        type: Sequelize.ARRAY(DataTypes.STRING),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('node_users');
  },
};
