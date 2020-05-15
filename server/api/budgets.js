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

router.post('/', async (req, res, next) => {
  try {
    let {description, amount, frequency, type} = req.body
    const newBudget = await Budget.create({
      description,
      amount,
      frequency,
      type
    })
    res.json(newBudget)
  } catch (err) {
    next(err)
  }
})
