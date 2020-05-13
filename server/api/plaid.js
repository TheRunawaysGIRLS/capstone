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

    console.log('ACCESS TOKEN', access_token)

    const data = await client.getAccounts(access_token).catch(console.error)

    const {accounts, item} = data

    console.log('FROM API ACCOUNTS', accounts, item)

    res.json(accounts)
    //   const user = await User.findOne().exec();

    //   const plaidItem = await new PlaidItem({
    //     userId: user._id,
    //     availableProducts: item.available_products,
    //     billedProducts: item.billed_products,
    //     institutionId: item.institution_id,
    //     itemId: item.item_id,
    //     webhook: item.webhook
    //   }).save();

    //   const savedAccounts = accounts.map(
    //     async account =>
    //       await new PlaidAccount({
    //         plaidItemId: plaidItem._id,
    //         accountId: account.account_id,
    //         mask: account.mask,
    //         balances: account.balances,
    //         name: account.name,
    //         officialName: account.official_name,
    //         subtype: account.subtype,
    //         type: account.type
    //       }).save()
    //   );

    //   console.log({
    //     savedAccounts
    //   });
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

    console.log('GOALS FROM ACCOUNT/BALANCE/GET ==>', goals)
    console.log('ACCOUNTS DATA FROM ACCOUNT/BALANCE/GET ==>', balance.accounts)

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
        '2010-01-01',
        '2020-05-10'
      )
      .catch(console.error)

    const {transactions} = data
    const budgets = await Budget.findAll()

    let allData = {budgets, transactions}

    console.log('BUDGETS=====>', budgets)
    console.log('CATEG=======>', transactions[0].category, transactions[0].name)

    res.json(allData)
  } catch (e) {
    console.error(e)
  }
})
