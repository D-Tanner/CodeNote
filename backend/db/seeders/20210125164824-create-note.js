'use strict';
const { random } = require('faker');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const notes = []
    for (let i = 1; i < 20; i++) {
      let newAnswer = {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        isBookmarked: random.boolean(),
        isPublic: random.boolean(),
        userId: Math.floor(Math.random() * 3) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      notes.push(newAnswer)
    }
    return queryInterface.bulkInsert('Notes', notes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
