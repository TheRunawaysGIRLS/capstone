const router = require('express').Router()
const {Budget} = require('../db/models/index')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const budgets = await Budget.findAll()
    res.json(budgets)
  } catch (err) {
    next(err)
  }
})
