'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('active_devices', 'packages', {
      type: DataTypes.JSONB,
    });
    await queryInterface.addColumn('active_devices', 'users', {
      type: DataTypes.JSONB,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('active_devices', 'packages');
    await queryInterface.removeColumn('active_devices', 'users');
  },
};
