const router = require('express').Router()
//const {User} = require('../db/models')
module.exports = router
const plaid = require('plaid')
const dotenv = require('dotenv')

dotenv.config()

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
)
process.env.ACCESS_TOKEN = null

router.post('/', async (req, res) => {
  try {
    const {publicToken} = req.body

    const {access_token} = await client
      .exchangePublicToken(publicToken)
      .catch(console.error)

    process.env.ACCESS_TOKEN = access_token

    const data = await client.getAccounts(access_token).catch(console.error)

    const {accounts, item} = data

    console.log('FROM API ACCOUNTS', accounts, item)

    //   const user = await User.findOne().exec();

    //   const plaidItem = await new PlaidItem({
    //     userId: user._id,
    //     availableProducts: item.available_products,
    //     billedProducts: item.billed_products,
    //     institutionId: item.institution_id,
    //     itemId: item.item_id,
    //     webhook: item.webhook
    //   }).save();

    res.json(accounts)

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

// router.post('/transactions/get', async (req, res) => {
//   // try {
//   //   let data = await client.getTransactions(
//   //     process.env.ACCESS_TOKEN,
//   //     (err, result) => {
//   //       const transactions = result.transactions
//   //     }
//   //   )
//   //   console.log(data, 'data!!')
//   //   console.log(transactions, 'transactions')
//   //   res.json(transactions)
//   // } catch (e) {
//   //   console.error(e)
//   // }
// })
