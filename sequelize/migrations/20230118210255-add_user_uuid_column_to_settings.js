'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DELETE FROM settings');

    await queryInterface.addColumn('settings', 'userUuid', {
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('settings', 'userUuid');
  },
};
