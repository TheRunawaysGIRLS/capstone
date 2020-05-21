const router = require('express').Router()
const User = require('../db/models/user')
const Module = require('../db/models/module')
module.exports = router

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({where: {email: email}})
    if (!user) {
      console.log('No such user found:', email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.put('/editprofile', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {email: req.body.email}})

    const userModulesArr = user.getModules()
    let userFound
    if (user) {
      user.update(req.body)
      userFound = await User.findOne({where: {email: req.body.email}})
      if (userModulesArr.length > 0) {
        userFound.setModules(userModulesArr)
      }
    }
    res.json(userFound)
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  const {email, password} = req.body
  try {
    const user = await User.create(req.body)
    let userfound = await User.findByPk(user.id)

    userfound.setModules([1, 2, 9, 10])

    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
