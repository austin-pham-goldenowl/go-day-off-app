'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fBookingName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fBookingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fStartTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fEndTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      users_fId: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};