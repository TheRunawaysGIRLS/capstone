const router = require('express').Router()
const {Budget} = require('../db/models/index')
const {isAdmin, userLoggedIn} = require('./gatekeepers')

module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const budgets = await Budget.findAll()
    res.json(budgets)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', userLoggedIn, async (req, res, next) => {
  try {
    const budget = await Budget.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(budget)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // let {description, amount, frequency, type} = req.body
    const newBudget = await Budget.create(req.body)
    res.json(newBudget)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/:budgetId', userLoggedIn, async (req, res, next) => {
  try {
    let budgetId = req.params.budgetId
    await Budget.destroy({
      where: {
        id: budgetId
      }
    })
    let remainingBudgets = await Budget.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(remainingBudgets)
  } catch (err) {
    next(err)
  }
})
