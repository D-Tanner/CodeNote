'use strict';
const { random } = require('faker');
const faker = require('faker');
const image = require('../models/image');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const images = []
    for (let i = 1; i < 20; i++) {
      let newImage = {
        url: faker.image.imageUrl(),
        noteId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      images.push(newImage)
    }
    return queryInterface.bulkInsert('Images', images, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
