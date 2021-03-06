'use strict'

const db = require('../server/db')
const {User, Module, Goal, Budget} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const modules = await Promise.all([
    Module.create({name: 'Transactions', link: '/transactions'}),
    Module.create({name: 'Spending by Category', link: '/categories'}),
    Module.create({name: 'Goals', link: '/goals'}),
    Module.create({name: 'Budget', link: '/budgets'}),
    Module.create({name: 'Real Estate ', link: '/estate'}),
    Module.create({name: 'Investing', link: '/investing'}),
    Module.create({name: 'Auto', link: '/auto'}),
    Module.create({name: 'Businesses', link: '/businesses'}),
    Module.create({name: '401k', link: '/401k'}),
    Module.create({name: 'Test Module', link: '/test'})
  ])

  const users = await Promise.all([
    User.create({
      firstName: 'Maria',
      lastName: 'Pichardo',
      email: 'maria@time.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Bailey',
      lastName: 'Keefer',
      email: 'Bailey@time.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Nataliia',
      lastName: 'RiabKova',
      email: 'Nataliia@time.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Noelle',
      lastName: 'Laureano',
      email: 'Noelle@time.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Cody',
      lastName: 'THE BOSS',
      email: 'cody@email.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Amerigo',
      lastName: 'Stow',
      email: 'astow1o@netscape.com',
      password: '123',
      address: '33 Trailsway Junction',
      isAdmin: false
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Em',
      lastName: 'Skuse',
      email: 'eskuse1p@buzzfeed.com',
      password: '123',
      address: '22488 Larry Circle',
      isAdmin: false
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Ben',
      lastName: 'Rodriguez',
      email: 'Ben@time.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Griff',
      lastName: 'Ludovici',
      email: 'gludovici1r@prlog.org',
      password: '123',
      address: '679 Cardinal Way',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Selig',
      lastName: 'Chadwin',
      email: 'schadwin1s@geocities.jp',
      password: '123',
      address: '08744 Springs Court',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Kip',
      lastName: 'Crannage',
      email: 'kcrannage1u@alexa.com',
      password: '123',
      address: '27947 Montana Avenue',
      isAdmin: true
    }).then(user => user.setModules([1, 2, 3, 4])),
    User.create({
      firstName: 'Russell',
      lastName: 'Heady',
      email: 'rheady1v@youtu.be',
      password: '123',
      address: '673 Messerschmidt Park',
      isAdmin: false
    }).then(user => user.setModules([1, 2, 3, 4]))
  ])
  const goal = await Promise.all([
    Goal.create({
      name: 'Trip to Italy',
      targetAmount: 3000,
      accountName: 'Saving',
      currentAmount: 120000,
      targetDate: 2020 - 10 - 15,
      amountPerMonth: 1800,
      userId: 1
    }),
    Goal.create({
      name: 'Wedding',
      targetAmount: 8000,
      accountName: 'Saving',
      currentAmount: 155000,
      targetDate: 2021 - 15 - 15,
      amountPerMonth: 1000,
      userId: 1
    }),
    Goal.create({
      name: 'Beach House',
      targetAmount: 9500,
      accountName: 'Saving',
      currentAmount: 750000,
      targetDate: 2023 - 10 - 15,
      amountPerMonth: 2000,
      userId: 1
    }),
    Goal.create({
      name: 'College',
      targetAmount: 3000,
      accountName: 'Saving',
      currentAmount: 250000,
      targetDate: 2020 - 10 - 15,
      amountPerMonth: 500,
      userId: 1
    })
  ])

  const budgets = await Promise.all([
    Budget.create({
      description: 'Job',
      amount: 1000,
      type: 'Income',
      frequency: 'weekly',
      userId: 1
    }),
    Budget.create({
      description: 'Rental Property',
      amount: 600,
      type: 'Income',
      frequency: 'monthly',
      userId: 1
    }),
    Budget.create({
      description: 'Rent',
      amount: 1500,
      type: 'Fixed\xa0Expense',
      frequency: 'monthly',
      userId: 1
    }),
    Budget.create({
      description: 'Student Loan',
      amount: 400,
      type: 'Fixed\xa0Expense',
      frequency: 'monthly',
      userId: 1
    }),
    Budget.create({
      description: 'Car Payment',
      amount: 300,
      type: 'Fixed\xa0Expense',
      frequency: 'weekly',
      userId: 1
    }),
    Budget.create({
      description: 'Food',
      amount: 100,
      type: 'Varying\xa0Expense',
      frequency: 'weekly',
      userId: 1
    }),
    Budget.create({
      description: 'Gas',
      amount: 30,
      type: 'Varying\xa0Expense',
      frequency: 'weekly',
      userId: 1
    })
  ])

  //const users = await Promise.all([User.bulkCreate(dummyUsers)])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${modules.length} Modules`)
  console.log(`seeded ${goal.length} Goals`)
  console.log(`seeded ${budgets.length} Budgets`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
