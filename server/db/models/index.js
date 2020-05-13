const User = require('./user')
const Budget = require('./budget')
const Account = require('./account')
const Goal = require('./goal')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Budget)
Budget.belongsTo(User)

User.hasMany(Account)
Account.belongsTo(User)

Account.hasMany(Goal)
Goal.belongsTo(Account)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Budget,
  Account,
  Goal
}
