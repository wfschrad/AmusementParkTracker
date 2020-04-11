'use strict';
module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    parkName: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    provinceState: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    opened: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    size: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  
  Park.associate = function(models) {
    // associations can be defined here
  };
  return Park;
};