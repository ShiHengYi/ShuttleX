'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */

      return queryInterface.bulkInsert('Payment', [
      {
        uid: 1,
        cardNumber: "234232342342234",
        expiry: "12/20",
        cvc: "123"
      },
      {
        uid: 2,
        cardNumber: "234232342342234",
        expiry: "12/20",
        cvc: "123"
      },
      {
        uid: 3,
        cardNumber: "234232342342234",
        expiry: "12/20",
        cvc: "123"
      },
      {
        uid: 4,
        cardNumber: "234232342342234",
        expiry: "12/20",
        cvc: "123"
      }
      ], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Payment', null, {});
  }
};
