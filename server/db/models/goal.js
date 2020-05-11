const Sequelize = require('sequelize')
const db = require('../db')

const Goal = db.define('goal', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  targetAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  targetDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  amountPerMonth: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Goal
