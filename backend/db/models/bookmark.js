'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: DataTypes.INTEGER,
    noteId: DataTypes.INTEGER,
    isBookmarked: DataTypes.BOOLEAN
  }, {});
  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User, { foreignKey: 'userId' })
    Bookmark.belongsTo(models.Note, { foreignKey: 'noteId' })
  };
  return Bookmark;
};
