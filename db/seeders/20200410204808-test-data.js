'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parks', [{
      parkName: 'DisneyLand',
      city: 'Anaheim',
      provinceState: 'California',
      country: 'USA',
      opened: new Date(1974, 0),
      size: 'pretty big',
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'This park is pretty sweet.'
    }], {});
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parks', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
