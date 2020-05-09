const router = require('express').Router()
const {Account} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //attributes: ['id', 'email']
    })
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const account = await Account.findByPk(id)
    res.json(account)
  } catch (err) {
    next(err)
  }
})
