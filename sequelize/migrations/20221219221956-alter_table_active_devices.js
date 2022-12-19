'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('active_devices', 'devices', {
      type: DataTypes.JSONB,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('active_devices', 'devices');
  },
};
