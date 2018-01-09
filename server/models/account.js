'use strict';
module.exports = function(sequelize, DataTypes) {
  var account = sequelize.define('Account', {
	uid:{
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
    name: {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    email: {
    	allowNull: false,
    	unique: true,
    	type: DataTypes.STRING
    },
    seatCount: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    password: {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    isDriver: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    payment: {
        type: DataTypes.BOOLEAN,
        defaultValue: DataTypes.UUIDV1 //ignore this
    }

  }, 
   {
		timestamps: false,
		freezeTableName: true
	});
  return account;
};