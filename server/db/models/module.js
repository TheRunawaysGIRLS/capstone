const Sequelize = require('sequelize')
const db = require('../db')

const Module = db.define('module', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Module
