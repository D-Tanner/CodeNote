'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Note.associate = function (models) {
    Note.belongsTo(models.User, { foreignKey: 'userId' })
    Note.hasMany(models.Bookmark, { foreignKey: 'noteId' })
  };
  return Note;
};
