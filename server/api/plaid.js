const router = require('express').Router()
//const {User} = require('../db/models')
module.exports = router
const plaid = require('plaid')

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
)

app.post('/plaid', async (req, res) => {
  try {
    const {publicToken} = req.body

    const {access_token} = await client
      .exchangePublicToken(publicToken)
      .catch(console.error)

    const {accounts, item} = await client
      .getAccounts(access_token)
      .catch(console.error)

    console.log(accounts, item)

    //   const user = await User.findOne().exec();

    //   const plaidItem = await new PlaidItem({
    //     userId: user._id,
    //     availableProducts: item.available_products,
    //     billedProducts: item.billed_products,
    //     institutionId: item.institution_id,
    //     itemId: item.item_id,
    //     webhook: item.webhook
    //   }).save();

    console.log({user, plaidItem})

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
