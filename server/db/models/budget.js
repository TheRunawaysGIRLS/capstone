const Sequelize = require('sequelize')
const db = require('../db')

const Budget = db.define('budget', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
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
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Income', 'Fixed Expense', 'Varying Expense']]
    }
  },
  frequency: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['monthly', 'weekly', 'bi-weekly', 'daily', 'one-time']]
    }
  }
})

module.exports = Budget
