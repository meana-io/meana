'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'email_notification', {
      type: DataTypes.BOOLEAN,
    });
    await queryInterface.addColumn('users', 'last_notification_at', {
      type: DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'last_notification_at');
  },
};
