const router = require('express').Router()
const {Budget} = require('../db/models/index')
const transactions = require('./plaid')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const budgets = await Budget.findAll()
    res.json(budgets)

    console.log('TRANS =========>', transactions)
  } catch (err) {
    next(err)
  }
})
