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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      // IncomeDescription: '',
      // IncomeType: '',
      // IncomeAmount: '',
      // IncomeFrequency: '',
      // FixedExpenseType: '',
      // FixedExpenseAmount: '',
      // FixedExpenseFrequency: '',
      // VaryingExpenseDescription: '',
      // VaryingExpenseType: '',
      // VaryingExpenseAmount: '',
      // VaryingExpenseFrequency: ''
    }
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
    if (type === 'Income') {
      let budget = {
        description: this.state.IncomeDescription,
        amount: this.state.IncomeAmount,
        frequency: this.state.IncomeFrequency,
        type: 'Income'
      }
      this.props.addBudget(budget)
    } else if (type === 'Fixed\xa0Expense') {
      let budget = {
        description: this.state['Fixed\xa0ExpenseDescription'],
        amount: this.state['Fixed\xa0ExpenseAmount'],
        frequency: this.state['Fixed\xa0ExpenseFrequency'],
        type: 'Fixed\xa0Expense'
      }
      this.props.addBudget(budget)
    } else if (type === 'Varying\xa0Expense') {
      let budget = {
        description: this.state['Varying\xa0ExpenseDescription'],
        amount: this.state['Varying\xa0ExpenseAmount'],
        frequency: this.state['Varying\xa0ExpenseFrequency'],
        type: 'Varying\xa0Expense'
      }
      this.props.addBudget(budget)
    }
  }

  handleDeleteClick(e) {
    console.log(e.target, 'e.target')
    let budgetId = e.target.name
    console.log("you're trying to delete this!")
    this.props.deleteBudget(budgetId)
  }

  handleSubmit() {
    console.log('submitted!')
  }

  render() {
    let allBudgets = this.props.allBudgets
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
                <td>$</td>
                <td>$</td>
                <td>$</td>
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
