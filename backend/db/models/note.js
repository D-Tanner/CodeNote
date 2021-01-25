'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    isBookmarked: DataTypes.BOOLEAN,
    isPublic: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Note.associate = function (models) {
    // associations can be defined here
  };
  return Note;
};
