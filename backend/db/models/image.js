'use strict';
const { random } = require('faker');
const faker = require('faker');

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING,
    noteId: DataTypes.INTEGER
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.Note, { foreignKey: 'noteId' })
  };
  return Image;
};
