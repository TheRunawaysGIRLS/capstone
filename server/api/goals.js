const router = require('express').Router()
const {Goal} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const goals = await Goal.findAll()
    console.log('GOALS====>', goals)
    res.json(goals)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const goal = await Goal.findByPk(id)
    console.log('GOAL=====>', goal)
    res.json(goal)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, targetAmount, targetDate, amountPerMonth} = req.body
    const goalObj = {name, targetAmount, targetDate, amountPerMonth}

    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    if (currentUser === req.user.dataValues) {
      const newGoal = await Product.create(goalObj)

      if (newGoal) {
        res.status(201).send(newGoal)
      } else {
        res.status(500).send('Unable to create a goal.')
      }
    } else {
      res.status(401).send('Log in to add a goal.')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const id = req.params.id

    const {name, targetAmount, targetDate, amountPerMonth} = req.body
    const reqBody = {name, targetAmount, targetDate, amountPerMonth}
    let goalObj = {}

    for (let key in reqBody) {
      if (reqBody[key]) goalObj[key] = reqBody[key]
    }

    if (currentUser === req.user.dataValues) {
      const updatedGoal = await Goal.update(goalObj, {where: {id: id}})
      if (updatedGoal) {
        res.send('Update successful!')
      } else {
        throw new Error('Update failed.')
      }
    } else {
      res.status(401).send('Log in to update a goal.')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let currentUser
    if (req.user) {
      currentUser = req.user.dataValues
    } else {
      currentUser = {}
    }

    const id = req.params.id

    if (currentUser === req.user.dataValues) {
      const deleted = await Goal.destroy({where: {id: id}})
      // ADDED THIS LINE TO SEND ID TO FRONT END
      res.send(id)
      // NOTE: checks below prevent id to be send to the front end...
      // if (deleted) {
      //   res.status(204).send('Goal deleted.')
      // } else {
      //   res.status(304).send('Failed to delete Goal.')
      // }
    } else {
      res.status(401).send('Log in to delete a goal.')
    }
  } catch (err) {
    next(err)
  }
})