const Sequelize = require('sequelize')
const db = require('../db')

const Budget = db.define('budget', {
  category: {
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

module.exports = Budget
