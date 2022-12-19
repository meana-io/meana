'use strict';

const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('node_cpu', 'socketDesignation', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'type', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'cpuId', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'version', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'voltage', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'externalClock', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'maxSpeed', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'status', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'upgrade', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'l1CacheHandle', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'l2CacheHandle', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'l3CacheHandle', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'serialNumber', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'assetTag', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'partNumber', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'coreEnabled', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'threadCount', {
      type: DataTypes.STRING,
    });
    await queryInterface.addColumn('node_cpu', 'characteristics', {
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('node_cpu', 'socketDesignation');
    await queryInterface.removeColumn('node_cpu', 'type');
    await queryInterface.removeColumn('node_cpu', 'cpuId');
    await queryInterface.removeColumn('node_cpu', 'version');
    await queryInterface.removeColumn('node_cpu', 'voltage');
    await queryInterface.removeColumn('node_cpu', 'externalClock');
    await queryInterface.removeColumn('node_cpu', 'maxSpeed');
    await queryInterface.removeColumn('node_cpu', 'status');
    await queryInterface.removeColumn('node_cpu', 'upgrade');
    await queryInterface.removeColumn('node_cpu', 'l1CacheHandle');
    await queryInterface.removeColumn('node_cpu', 'l2CacheHandle');
    await queryInterface.removeColumn('node_cpu', 'l3CacheHandle');
    await queryInterface.removeColumn('node_cpu', 'serialNumber');
    await queryInterface.removeColumn('node_cpu', 'assetTag');
    await queryInterface.removeColumn('node_cpu', 'partNumber');
    await queryInterface.removeColumn('node_cpu', 'coreEnabled');
    await queryInterface.removeColumn('node_cpu', 'threadCount');
    await queryInterface.removeColumn('node_cpu', 'characteristics');
  },
};
