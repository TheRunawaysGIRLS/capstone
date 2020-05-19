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
        where: {id: req.params.userId},
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

// Module By UserID Checkbox

router.get('/:userId/Checkbox', async (req, res, next) => {
  try {
    const userModules = await Module.findAll({
      attributes: ['id', 'name'],
      include: {
        model: User,
        attributes: ['id'],
        where: {id: req.params.userId},
        through: {
          attributes: []
        },
        required: true
      }
    })

    const allModules = await Module.findAll({
      attributes: ['id', 'name']
    })

    const userModulesArr = userModules.map(module => module.id)

    const modulesArr = allModules.map(
      module =>
        userModulesArr.indexOf(module.id) !== -1
          ? {
              id: module.id,
              name: module.name,
              isChecked: true
            }
          : {
              id: module.id,
              name: module.name,
              isChecked: false
            }
    )

    res.json(modulesArr)
  } catch (err) {
    next(err)
  }
})

// Bring up Navbar

router.get('/:userId/navbar', async (req, res, next) => {
  try {
    const userModules = await Module.findAll({
      attributes: ['name', 'link'],
      include: {
        model: User,
        attributes: ['id'],
        where: {id: req.params.userId},
        through: {
          attributes: []
        },
        required: true
      }
    })
    // const userModulesArr = userModules.map(module => (
    // 	 "/" + module.link
    // ));
    res.json(userModules)
    //res.json(`(<span> ${userModulesArr.join(' ')}</span > )`)
  } catch (err) {
    next(err)
  }
})
// Add modules to User - User Settings

router.put('/usermodule/:userId', async (req, res, next) => {
  try {
    console.log('IN /usermodule/:userId  req modules ==> ', req.body.modules)
    console.log(
      'IN /usermodule/:userId  req.params.userId ==> ',
      req.params.userId
    )
    let updateModules = req.body.modules
    let user = await User.findByPk(req.params.userId)

    user.setModules(updateModules)

    let userModules = await Module.findAll({
      attributes: ['id', 'name'],
      include: {
        model: User,
        attributes: ['id'],
        where: {id: req.params.userId},
        through: {
          attributes: []
        },
        required: true
      }
    })
    userModules = await Module.findAll({
      attributes: ['id', 'name'],
      include: {
        model: User,
        attributes: ['id'],
        where: {id: req.params.userId},
        through: {
          attributes: []
        },
        required: true
      }
    })

    const allModules = await Module.findAll({
      attributes: ['id', 'name']
    })

    const userModulesArr = userModules.map(module => module.id)

    const modulesArr = allModules.map(
      module =>
        userModulesArr.indexOf(module.id) !== -1
          ? {
              id: module.id,
              name: module.name,
              isChecked: true
            }
          : {
              id: module.id,
              name: module.name,
              isChecked: false
            }
    )

    res.json(modulesArr)
  } catch (err) {
    next(err)
  }
})
