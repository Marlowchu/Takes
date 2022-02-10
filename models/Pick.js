const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pick extends Model {}

Pick.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    take_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'take',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pick',
  }
);

module.exports = Pick;
