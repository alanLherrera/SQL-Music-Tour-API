'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meetgreet extends Model {
    
    static associate({ Band }) {
      meetgreet.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      }) 
      meetgreet.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })
    }
  }
  meetgreet.init({
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
  })

  return meetgreet;
};