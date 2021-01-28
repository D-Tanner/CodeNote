'use strict';
const { random } = require('faker');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bookmarks = []
    for (let i = 1; i < 20; i++) {
      let newAnswer = {
        userId: Math.floor(Math.random() * 3) + 1,
        noteId: Math.floor(Math.random() * 19) + 1,
        isBookmarked: random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      bookmarks.push(newAnswer)
    }
    return queryInterface.bulkInsert('Bookmarks', bookmarks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookmarks', null, {});
  }
};
