'use strict';
const { random } = require('faker');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bookmarks = []
    let userCount = 1;
    let noteCount = 1;
    for (let i = 1; i <= 60; i++) {
      let newAnswer = {
        userId: userCount,
        // noteId: Math.floor(Math.random() * 19) + 1,
        noteId: noteCount,
        isBookmarked: random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      bookmarks.push(newAnswer)
      userCount++;
      if (userCount === 4) {
        userCount = 1;
        noteCount++;
      }
    }
    return queryInterface.bulkInsert('Bookmarks', bookmarks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookmarks', null, {});
  }
};
