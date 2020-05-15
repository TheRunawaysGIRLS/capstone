const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
  accountType: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  accountIdFromPlaid: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Account
