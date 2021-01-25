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
    Note.belongsTo(models.User, { foreignKey: 'userId' })
    Note.hasMany(models.Image, { foreignKey: 'noteId' })
  };
  return Note;
};
