import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchBudgets, addBudgetToDB, deleteBudget} from '../store/budgets'
import {VictoryBar, VictoryChart, VictoryStack} from 'victory'

/**
 * COMPONENT
 */
export class Budgets extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchBudgets(this.props.userId)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    const type = e.target.value
    let budget = {
      description: this.state[type + 'Description'],
      amount: this.state[type + 'Amount'],
      frequency: this.state[type + 'Frequency'],
      type: type,
      userId: this.props.userId
    }
    this.props.addBudget(budget)
  }

  handleDeleteClick(e) {
    const budgetId = e.target.name
    const userId = this.props.userId
    this.props.deleteBudget(userId, budgetId)
  }

  render() {
    let allBudgets = this.props.allBudgets
    let totalIncome = 0
    let totalExpenses = 0
    const colors = {
      mzblue: '#384780',
      mzgreen: '#4CB38A',
      mzmagenta: '#8F3B76',
      mzpink: '#FFF1F8',
      mzred: '#E62663'
    }

    for (let i = 0; i < allBudgets.length; i++) {
      let currBudget = allBudgets[i]
      if (currBudget.type === 'Income') {
        if (currBudget.frequency === 'monthly') totalIncome += currBudget.amount
        if (currBudget.frequency === 'bi-weekly')
          totalIncome += 2 * currBudget.amount
        if (currBudget.frequency === 'weekly')
          totalIncome += 4 * currBudget.amount
        if (currBudget.frequency === 'daily')
          totalIncome += 30 * currBudget.amount
        if (currBudget.frequency === 'one-time')
          totalIncome += currBudget.amount
      }
      if (
        currBudget.type === 'Fixed\xa0Expense' ||
        currBudget.type === 'Varying\xa0Expense'
      ) {
        if (currBudget.frequency === 'monthly')
          totalExpenses += currBudget.amount
        if (currBudget.frequency === 'bi-weekly')
          totalExpenses += 2 * currBudget.amount
        if (currBudget.frequency === 'weekly')
          totalExpenses += 4 * currBudget.amount
        if (currBudget.frequency === 'daily')
          totalExpenses += 30 * currBudget.amount
        if (currBudget.frequency === 'one-time')
          totalExpenses += currBudget.amount
      }
    }

    let dataIncome = [{x: 'This Month', y: totalIncome - totalExpenses}]
    let dataExpenses = [{x: 'This Month', y: totalExpenses}]

    const types = ['Income', 'Fixed\xa0Expense', 'Varying\xa0Expense']
    // if (allBudgets.length) {
    return (
      <div className="budget-container">
        <div className="all-budgets">
          <h5>
            Enter your income and expenses below to plan your monthly savings!
          </h5>
          {types.map(type => {
            return (
              <div key={type}>
                <h4>{type}</h4>
                <table className="fl-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Frequency</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBudgets.map((budget, index) => {
                      if (budget.type === type) {
                        return (
                          <tr key={index}>
                            <td>{budget.description}</td>
                            <td>${budget.amount}</td>
                            <td>{budget.frequency}</td>
                            <td>
                              <button
                                className="delete-button"
                                name={budget.id}
                                onClick={this.handleDeleteClick}
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        )
                      }
                    })}
                    <tr>
                      <td>
                        <input
                          name={`${type}Description`}
                          type="text"
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        $
                        <input
                          name={`${type}Amount`}
                          type="text"
                          onChange={this.handleChange}
                        />
                      </td>
                      <td>
                        <select
                          name={`${type}Frequency`}
                          onChange={this.handleChange}
                        >
                          <option value="monthly" />
                          <option value="monthly">monthly</option>
                          <option value="bi-weekly">bi-weekly</option>
                          <option value="weekly">weekly</option>
                          <option value="daily">daily</option>
                          <option value="one-time">one-time</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="budget-submit"
                          type="submit"
                          name={`${type}Type`}
                          value={type}
                          onClick={this.handleClick}
                        >
                          Add {type}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
        <div className="budget-calculator">
          <h4>Budget Calculator</h4>
          <table className="fl-table">
            <thead>
              <tr>
                <th>Total Monthly Income</th>
                <th>Total Monthly Expenses</th>
                <th>Total Monthly Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${totalIncome}</td>
                <td>${totalExpenses}</td>
                <td>${totalIncome - totalExpenses}</td>
              </tr>
            </tbody>
          </table>
          <h4>Suggested Daily Budget</h4>
          <table className="fl-table">
            <thead>
              <tr>
                <th>Spending/Day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${((totalIncome - totalExpenses) / 30).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <VictoryChart height={300} padding={50} domainPadding={{x: 50}}>
            <VictoryStack
              colorScale={[
                colors.mzgreen,
                colors.mzmagenta,
                colors.mzred,
                colors.mzblue,
                colors.mzpink
              ]}
            >
              <VictoryBar data={dataExpenses} barWidth={30} />
              <VictoryBar data={dataIncome} barWidth={30} />
            </VictoryStack>
          </VictoryChart>
        </div>
      </div>
    )
    // } else {
    //   return (
    //     <p className="loading">
    //       <img src="/loading.gif" />
    //     </p>
    //   )
    // }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allBudgets: state.budgets.allBudgets,
    userId: state.user.id
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    fetchBudgets: userId => dispatch(fetchBudgets(userId)),
    addBudget: budget => dispatch(addBudgetToDB(budget)),
    deleteBudget: (userId, budgetId) => dispatch(deleteBudget(userId, budgetId))
  }
}

export default connect(mapState, mapDispatch)(Budgets)
