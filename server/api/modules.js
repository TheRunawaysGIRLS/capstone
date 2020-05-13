const router = require('express').Router()
const {User} = require('../db/models')
const Module = require('../db/models/module')
const Sequelize = require('sequelize')

module.exports = router

// All modules

router.get('/', async (req, res, next) => {
  try {
    const modules = await Module.findAll({
      attributes: ['id', 'name']
    })
    res.json(modules)
  } catch (err) {
    next(err)
  }
})

// Module By ID

router.get('/:moduleId', async (req, res, next) => {
  try {
    const module = await Module.findByPk(req.params.moduleId)
    res.json(module)
  } catch (err) {
    next(err)
  }
})

// Add a module Admins only
//router.post('/', isAdmin, async (req, res, next) => {

router.post('/', async (req, res, next) => {
  try {
    const newModuleInstance = {
      name: req.body.name
    }
    const createdModule = await Module.create(newModuleInstance)
    res.json(createdModule)
  } catch (err) {
    next(err)
  }
})

// Update a Module Admins only

// router.put(`/:moduleId`, isAdmin, async (req, res, next) => {
router.put('/:moduleId', async (req, res, next) => {
  try {
    await Module.findByPk(req.params.moduleId).then(async module => {
      await module.update({
        name: req.body.name
      })
      res.json(module)
    })
  } catch (err) {
    next(err)
  }
})

// Delete  a Module Admins only

//router.delete('/:moduleId', isAdmin, async (req, res, next) => {

router.delete('/:moduleId', async (req, res, next) => {
  const moduleId = req.params.moduleId
  try {
    await Module.destroy({where: {id: moduleId}})
    res.json(moduleId)
  } catch (err) {
    next(err)
  }
})

// Module By UserID

router.get('/:userId/user', async (req, res, next) => {
  try {
    const userModules = await Module.findAll({
      attributes: ['id', 'name'],
      include: {
        model: User,
        attributes: ['id'],
        through: {
          attributes: []
        },
        required: true
      }
    })

    res.json(userModules)
  } catch (err) {
    next(err)
  }
})

// Add modules to User - User Settings

router.put('/usermodule/:userId', async (req, res, next) => {
  try {
    let updateModules = req.body.modules

    await User.findByPk(req.params.userId).then(async user => {
      user
        .update({
          updatedAt: null
        })
        .then(updatedUser => {
          updatedUser.setModules(updateModules)
          res.json(user)
        })
    })
  } catch (err) {
    next(err)
  }
})
