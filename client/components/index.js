/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as Home} from './home'
export {default as DataViz} from './DataViz'
export {default as Budgets} from './Budgets'
export {default as UserNavBar} from './UserNavBar'
export {default as Profile} from './Profile'
export {default as Transactions} from './transactions'
export {default as SpendingByCategory} from './spendingByCategory'
export {default as SpendCatPie} from './SpendCatPie'
export {default as UserAccounts} from './UserAccounts'
export {default as Landing} from './landing'

// export {default as Plaid} from './Plaid'
export {Login, Signup, EditProfile} from './auth-form'
