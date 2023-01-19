'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stage extends Model {
    
    static associate({Event, StageEvent}) {
      // define association here
      stage.belongsToMnay(Event, {
        foreignKey: "stage_id",
        as: "events",
        through: StageEvent,
      })
      stage.hasMany(SetTimes, {
        foreignKey: "stage_id",
        as: "set_times"
      })
    }
  }
  stage.init({
    band_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    available_start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    timestamps: false
  });

  return stage;
};