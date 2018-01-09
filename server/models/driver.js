module.exports = function(sequelize, DataTypes) {
  var driver = sequelize.define('Driver', {
	did:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		references: {model: 'Account', key: 'uid'},
		onDelete: 'cascade'
	},
    name: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    isOnline: {
    	type: DataTypes.BOOLEAN,
    	allowNull: false
    },
    partyCount: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    totalSeats: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    openSeats: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    }
  }, {
		timestamps: false,
		freezeTableName: true
	});
  return driver;
};