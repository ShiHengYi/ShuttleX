module.exports = function(sequelize, DataTypes) {
  var ride_request = sequelize.define('Ride_request', {
	rid1:{
		type: DataTypes.INTEGER,
		unique: true,
		allowNull: false
	},
	rid2:{
		type: DataTypes.INTEGER,
		unique: true
	},
	did:{
		type: DataTypes.INTEGER,
		unique: true,
		primaryKey: true,
		allowNull: false,
	},
    pickup1: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    pickup2: DataTypes.STRING,
    dropoff: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
  }, {
		timestamps: false,
		freezeTableName: true
	});
  return ride_request;
};