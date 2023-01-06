'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'push_notifications', {
      type: DataTypes.BOOLEAN,
    });
    await queryInterface.renameColumn(
      'users',
      'email_notification',
      'email_notifications'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'push_notifications');
    await queryInterface.renameColumn(
      'users',
      'email_notifications',
      'email_notification'
    );
  },
};
