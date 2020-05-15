'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const dummyUsers = [
    {
      firstName: 'Dayle',
      lastName: 'Mixter',
      email: 'dmixter1n@time.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    },
    {
      firstName: 'Cody',
      lastName: 'THE BOSS',
      email: 'cody@email.com',
      password: '123',
      address: '7 Vahlen Place',
      isAdmin: true
    },
    {
      firstName: 'Amerigo',
      lastName: 'Stow',
      email: 'astow1o@netscape.com',
      password: '123',
      address: '33 Trailsway Junction',
      isAdmin: false
    },
    {
      firstName: 'Em',
      lastName: 'Skuse',
      email: 'eskuse1p@buzzfeed.com',
      password: '123',
      address: '22488 Larry Circle',
      isAdmin: false
    },
    {
      firstName: 'Dasha',
      lastName: 'Woolfall',
      email: 'dwoolfall1q@altervista.org',
      password: '123',
      address: '2 Declaration Crossing',
      isAdmin: false
    },
    {
      firstName: 'Griff',
      lastName: 'Ludovici',
      email: 'gludovici1r@prlog.org',
      password: '123',
      address: '679 Cardinal Way',
      isAdmin: true
    },
    {
      firstName: 'Selig',
      lastName: 'Chadwin',
      email: 'schadwin1s@geocities.jp',
      password: '123',
      address: '08744 Springs Court',
      isAdmin: true
    },
    {
      firstName: 'Carline',
      lastName: 'Nelligan',
      email: 'cnelligan1t@tripod.com',
      password: '123',
      address: '2 Jenifer Trail',
      isAdmin: false
    },
    {
      firstName: 'Kip',
      lastName: 'Crannage',
      email: 'kcrannage1u@alexa.com',
      password: '123',
      address: '27947 Montana Avenue',
      isAdmin: true
    },
    {
      firstName: 'Russell',
      lastName: 'Heady',
      email: 'rheady1v@youtu.be',
      password: '123',
      address: '673 Messerschmidt Park',
      isAdmin: false
    },
    {
      firstName: 'Javier',
      lastName: 'Leamy',
      email: 'jleamy1w@stumbleupon.com',
      password: '123',
      address: '76 Grover Avenue',
      isAdmin: false
    },
    {
      firstName: 'Holly',
      lastName: 'Bradder',
      email: 'hbradder1x@businessweek.com',
      password: '123',
      address: '06658 Scott Court',
      isAdmin: true
    },
    {
      firstName: 'Rustin',
      lastName: 'Collcott',
      email: 'rcollcott1y@bloomberg.com',
      password: '123',
      address: '4551 Sunnyside Point',
      isAdmin: true
    },
    {
      firstName: 'Chrissie',
      lastName: 'Peaseman',
      email: 'cpeaseman1z@hexun.com',
      password: '123',
      address: '51 Erie Road',
      isAdmin: false
    },
    {
      firstName: 'Lanie',
      lastName: 'Meran',
      email: 'lmeran20@earthlink.net',
      password: '123',
      address: '7330 Summit Street',
      isAdmin: false
    },
    {
      firstName: 'Gaye',
      lastName: 'Teeney',
      email: 'gteeney21@pagesperso-orange.fr',
      password: '123',
      address: '034 Hallows Avenue',
      isAdmin: false
    },
    {
      firstName: 'Holly',
      lastName: 'Chair',
      email: 'admin@wechair.com',
      password: '123',
      address: '034 Hallows Avenue',
      isAdmin: true
    }
  ]

  const users = await Promise.all([User.bulkCreate(dummyUsers)])

  console.log(`seeded ${users.length} users`)
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
