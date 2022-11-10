'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('settings', 'value', {
      type: DataTypes.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('settings', 'value', {
      type: DataTypes.STRING,
    });
  },
};
