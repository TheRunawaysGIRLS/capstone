const router = require('express').Router()
module.exports = router
const plaid = require('plaid')
const dotenv = require('dotenv')
const {Budget} = require('../db/models/index')
const {Goal} = require('../db/models/index')

dotenv.config()

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
)

router.post('/', async (req, res) => {
  try {
    const {publicToken} = req.body

    const {access_token} = await client
      .exchangePublicToken(publicToken)
      .catch(console.error)

    process.env.PLAID_ACCESS_TOKEN = access_token

    const data = await client.getAccounts(access_token).catch(console.error)

    const {accounts, item} = data

    res.json(accounts)
  } catch (e) {
    console.error(e)
  }
})

router.post('/accounts/balance/get', async (req, res) => {
  try {
    let data = await client
      .getBalance(process.env.PLAID_ACCESS_TOKEN)
      .catch(console.error)

    const balance = data
    const goals = await Goal.findAll()

    let allData = {balance, goals}

    res.json(allData)
  } catch (e) {
    console.error(e)
  }
})

router.post('/item/get', async (req, res) => {
  try {
    let data = await client
      .getItem(process.env.PLAID_ACCESS_TOKEN)
      .catch(console.error)

    const items = data

    res.json(items)
  } catch (e) {
    console.error(e)
  }
})

router.post('/categories/get', async (req, res) => {
  try {
    let data = await client.getCategories().catch(console.error)
    let categories = data.categories.map(category => {
      return category.hierarchy
    })

    res.json(categories)
  } catch (e) {
    console.error(e)
  }
})

router.post('/transactions/get', async (req, res) => {
  try {
    let data = await client
      .getTransactions(
        process.env.PLAID_ACCESS_TOKEN,
        '2015-01-01',
        '2020-05-19'
      )
      .catch(console.error)

    const {transactions} = data
    const budgets = await Budget.findAll()

    let allData = {budgets, transactions}

    res.json(allData)
  } catch (e) {
    console.error(e)
  }
})
