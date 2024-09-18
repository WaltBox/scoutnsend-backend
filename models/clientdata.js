'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClientData.init({
    name: DataTypes.STRING,
    industry: DataTypes.STRING,
    message: DataTypes.TEXT,
    email: DataTypes.STRING,
    scouterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClientData',
  });
  return ClientData;
};