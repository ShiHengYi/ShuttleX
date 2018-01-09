'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */

      return queryInterface.bulkInsert('Driver', [
      {
        did: 6,
        name: "Driver 1",
        isOnline: true,
        partyCount: 0 ,
        totalSeats: 12,
        openSeats: 12
      },
      {
        did: 8,
        name: "Driver 2",
        isOnline: true,
        partyCount: 0,
        totalSeats: 12,
        openSeats: 12
      },
      {
        did: 9,
        name: "Driver 3",
        isOnline: true,
        partyCount: 0,
        totalSeats: 10,
        openSeats: 10
      },
      {
        did: 10,
        name: "Driver 4",
        isOnline: true,
        partyCount: 0,
        totalSeats: 10,
        openSeats: 10
      },
      {
        did: 11,
        name: "Driver 5",
        isOnline: true,
        partyCount: 0,
        totalSeats: 10,
        openSeats: 10
      },
      {
        did: 12,
        name: "Driver 6",
        isOnline: true,
        partyCount: 0,
        totalSeats: 10,
        openSeats: 10
      },
      {
        did: 13,
        name: "Driver 3",
        isOnline: true,
        partyCount: 0,
        totalSeats: 10,
        openSeats: 10
      }
      
      ], {});
      },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
      return queryInterface.bulkDelete('Driver', null, {});
    
  }
};
