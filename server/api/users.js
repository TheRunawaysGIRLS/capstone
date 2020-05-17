const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//get single User route
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const foundUser = await User.findByPk(id)
    if (foundUser.dataValues.id === req.user.id) {
      let user = foundUser.dataValues
      res.json(user)
    }
  } catch (err) {
    next(err)
  }
})

//add single user route
router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password, address} = req.body
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      address
    })
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})
