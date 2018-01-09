'use strict';
module.exports = function(sequelize, DataTypes) {
  var payment = sequelize.define('Payment', {
	uid:{
		type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {model: 'Account', key: 'uid'},
        onDelete: 'cascade'
	},
    cardNumber: {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    expiry: {
    	allowNull: false,
    	type: DataTypes.STRING
    },
    cvc: {
    	allowNull: false,
    	type: DataTypes.STRING
    }
  }, 
   {
		timestamps: false,
		freezeTableName: true,
        
	});
  return payment;
};