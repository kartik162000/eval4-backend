'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Collections.belongsTo(models.Content, { foreignKey: 'content_id' });
    }
  }
  Collections.init({
    content_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Content',
        key: 'id'
      }
    },
    Collection_Name: DataTypes.STRING,
    Collection_Value: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Collections',
  });
  return Collections;
};