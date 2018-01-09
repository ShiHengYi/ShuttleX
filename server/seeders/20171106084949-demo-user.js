'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert('Account', [
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '2085705153',
        isDriver: false,
        payment: true
    },
    {
        name: 'Sarah Gandhi',
        email: 'ank@gmail.com',
        password: '2085705153',
        isDriver: false,
        payment: true
    },
    {
        name: 'Ankit Gandhi Jr',
        email: 'ankjr@gmail.com',
        password: '2085705153',
        isDriver: false,
        payment: true
    },
    {
        name: 'ManinderPal',
        email: 'mani@gmail.com',
        password: '2085705153',
        isDriver: false,
        payment: true
    },
    {
        name: 'Harkamal Grewal',
        email: 'kamal@gmail.com',
        password: '2085705153',
        isDriver: false,
        payment: false
    },
    {
        name: 'Driver 1',
        email: 'driver1@gmail.com',
        password: '2085705153',
        seatCount: 12,
        isDriver: true
    },
    {
        name: 'User 4',
        email: 'user4@gmail.com',
        password: '2085705153',
        isDriver: false,
        payment: false
    },
    {
        name: 'Driver 2',
        email: 'driver2@gmail.com',
        password: '2085705153',
        seatCount: 12,
        isDriver: true
    },
    {
        name: 'Driver 3',
        email: 'driver3@gmail.com',
        password: '2085705153',
        seatCount: 12,
        isDriver: true
    },
    {
        name: 'Driver 4',
        email: 'driver4@gmail.com',
        password: '2085705153',
        seatCount: 10,
        isDriver: true
    },
    {
        name: 'Driver 5',
        email: 'driver5@gmail.com',
        password: '2085705153',
        seatCount: 11,
        isDriver: true
    },
    {
        name: 'Driver 6',
        email: 'driver6@gmail.com',
        password: '2085705153',
        seatCount: 12,
        isDriver: true
    },
    {
        name: 'Driver 7',
        email: 'driver7@gmail.com',
        password: '2085705153',
        seatCount: 13,
        isDriver: true
    }

    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkDelete('Account', null, {});
    
  }
};
