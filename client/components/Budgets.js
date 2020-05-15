import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchBudgets, addBudgetToDB} from '../store/budgets'

/**
 * COMPONENT
 */
export class Budgets extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      IncomeDescription: '',
      IncomeType: '',
      IncomeAmount: '',
      IncomeFrequency: '',
      FixedExpenseType: '',
      FixedExpenseAmount: '',
      FixedExpenseFrequency: '',
      VaryingExpenseDescription: '',
      VaryingExpenseType: '',
      VaryingExpenseAmount: '',
      VaryingExpenseFrequency: ''
    }
  }

  componentDidMount() {
    this.props.fetchBudgets()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state, 'this.state')
  }

  handleClick(e) {
    console.log(e.target.value, 'e.target.value')
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state, 'this.state')
    let budget = {
      description: this.state.IncomeDescription,
      amount: this.state.IncomeAmount,
      frequency: this.state.IncomeFrequency,
      type: 'Income'
    }
    console.log(budget, 'budget')
    if (e.target.value === 'Income') {
      this.props.addBudget(budget)
    }
  }

  handleSubmit() {
    console.log('submitted!')
  }

  render() {
    let allBudgets = this.props.allBudgets
    console.log(allBudgets, 'allBudgets')
    const types = ['Income', 'FixedExpense', 'VaryingExpense']
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
                    </tr>
                    {allBudgets.map((budget, index) => {
                      if (budget.type === type) {
                        return (
                          <tr key={index}>
                            <td>{budget.description}</td>
                            <td>{budget.amount}</td>
                            <td>{budget.frequency}</td>
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
    addBudget: budget => dispatch(addBudgetToDB(budget))
  }
}

export default connect(mapState, mapDispatch)(Budgets)
