'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     models.Content.hasMany(models.Collections,{ foreignKey: 'id' });
    }
  }
  Content.init({
    contentType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    contentStructure: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};