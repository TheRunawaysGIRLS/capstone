const User = require('./user')
const Budget = require('./budget')
const Module = require('./module')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Budget)
Budget.belongsTo(User)

Module.belongsToMany(User, {through: 'UserModule'})

// Module model relationships
Module.belongsToMany(User, {through: 'UserModule'})
User.belongsToMany(Module, {through: 'UserModule'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Budget,
  Module
}
