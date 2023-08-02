'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [{
      name: 'phone',
      parentId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Electronics',
      parentId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'AutoMobile',
      parentId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
