const router = require('express').Router()
const {Budget} = require('../db/models/index')
const plaid = require('plaid')
const dotenv = require('dotenv')

dotenv.config()

module.exports = router

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
)

router.get('/', async (req, res, next) => {
  try {
    const budgets = await Budget.findAll()
    res.json(budgets)
  } catch (err) {
    next(err)
  }
})
