import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchBudgets, addBudgetToDB, deleteBudget} from '../store/budgets'

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
    this.props.fetchBudgets()
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
      type: type
    }
    this.props.addBudget(budget)
  }

  handleDeleteClick(e) {
    let budgetId = e.target.name
    this.props.deleteBudget(budgetId)
  }

  calculateTotalIncome() {}

  render() {
    let allBudgets = this.props.allBudgets
    let totalIncome = 0
    let totalExpenses = 0
    for (let i = 0; i < allBudgets.length; i++) {
      let currBudget = allBudgets[i]
      if (currBudget.type === 'Income') totalIncome += currBudget.amount
      if (
        currBudget.type === 'Fixed\xa0Expense' ||
        currBudget.type === 'Varying\xa0Expense'
      )
        totalExpenses += currBudget.amount
    }
    console.log(totalIncome, 'totalIncome')
    console.log(totalExpenses, 'totalExpenses')

    const types = ['Income', 'Fixed\xa0Expense', 'Varying\xa0Expense']
    return (
      <div className="budget-container">
        <div className="all-budgets">
          {types.map(type => {
            return (
              <div key={type}>
                <h4>{type}</h4>
                <table className="budget-table">
                  <tbody>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Frequency</th>
                      <th>Action</th>
                    </tr>
                    {allBudgets.map((budget, index) => {
                      if (budget.type === type) {
                        return (
                          <tr key={index}>
                            <td>{budget.description}</td>
                            <td>{budget.amount}</td>
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
          <table className="budget-table">
            <tbody>
              <tr>
                <th>Total Monthly Income</th>
                <th>Total Monthly Expenses</th>
                <th>Total Monthly Savings</th>
              </tr>
              <tr>
                <td>${totalIncome}</td>
                <td>${totalExpenses}</td>
                <td>${totalIncome - totalExpenses}</td>
              </tr>
            </tbody>
          </table>
          <h4>Suggested Daily Budget</h4>
          <table className="spending-per-day-table">
            <tbody>
              <tr>
                <th>Spending/Day</th>
              </tr>
              <tr>
                <td>${(totalIncome - totalExpenses) / 30}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allBudgets: state.budgets.allBudgets
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    fetchBudgets: () => dispatch(fetchBudgets()),
    addBudget: budget => dispatch(addBudgetToDB(budget)),
    deleteBudget: budgetId => dispatch(deleteBudget(budgetId))
  }
}

export default connect(mapState, mapDispatch)(Budgets)
