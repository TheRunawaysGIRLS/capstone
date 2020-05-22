import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/transactions'
import {VictoryLabel, VictoryPie} from 'victory'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

/**
 * COMPONENT
 */
export class SpendingByCategory extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.state = {
      selectedCategory: ''
    }
  }
  componentDidMount() {
    this.props.fetchTransactions()
  }

  handleClick() {
    this.props.fetchTransactions()
  }

  handleCategoryClick(e) {
    this.setState({
      selectedCategory: e.target.name
    })
  }

  render() {
    let allTransactions = this.props.allTransactions
    let categoryMemo = {}
    let categories = []
    let total = 0
    for (let i = 0; i < allTransactions.length; i++) {
      if (!categoryMemo[allTransactions[i].category[0]]) {
        categories.push(allTransactions[i].category[0])
        categoryMemo[allTransactions[i].category[0]] = allTransactions[i].amount
        total += allTransactions[i].amount
      } else {
        categoryMemo[allTransactions[i].category[0]] +=
          allTransactions[i].amount
        total += allTransactions[i].amount
      }
    }
    let data = []
    let misc = {
      x: 'Miscellaneous',
      y: 0
    }
    for (let i = 0; i < categories.length; i++) {
      if (categoryMemo[categories[i]] / total > 0.1) {
        data.push({
          x: categories[i],
          y: categoryMemo[categories[i]]
        })
      } else {
        misc.y += categoryMemo[categories[i]]
      }
    }
    data.push(misc)
    const colors = {
      mzblue: '#384780',
      mzgreen: '#4CB38A',
      mzmagenta: '#8F3B76',
      mzpink: '#FFF1F8',
      mzred: '#E62663'
    }
    if (allTransactions.length) {
      return (
        <div className="category-transactions">
          <div className="category-container">
            <div className="category-viz">
              <h3>Spending By Category</h3>
              <VictoryPie
                colorScale={[
                  colors.mzgreen,
                  colors.mzmagenta,
                  colors.mzred,
                  colors.mzblue,
                  colors.mzpink
                ]}
                data={data}
                width={350}
                height={350}
                padding={0}
                innerRadius={75}
                labelRadius={95}
                padAngle={2}
                labels={({datum}) => datum.y}
                labelComponent={<VictoryLabel text={({datum}) => datum.x} />}
              />
            </div>
            <div className="categories">
              <h3>Select A Category</h3>
              {categories.map((category, index) => {
                return (
                  <button
                    className="category-button"
                    type="submit"
                    name={category}
                    key={index}
                    onClick={this.handleCategoryClick}
                  >
                    {category}
                    <br />
                    {formatter.format(categoryMemo[category])}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="all-transactions">
            <h3>Transactions:</h3>
            <table className="fl-table">
              <thead>
                <tr>
                  <th className="transaction-date">Date</th>
                  <th className="transaction-category">Category</th>
                  <th className="transaction-subcategory">Subcategory</th>
                  <th className="transaction-description">Description</th>
                  <th className="money">Amount</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map(transaction => {
                  if (transaction.category[0] === this.state.selectedCategory) {
                    return (
                      <tr key={transaction.transaction_id}>
                        <td className="transaction-date">{transaction.date}</td>
                        <td className="transaction-category">
                          {transaction.category[0]}
                        </td>
                        <td className="transaction-subcategory">
                          {transaction.category[1]}
                        </td>
                        <td className="transaction-description">
                          {transaction.name}
                        </td>
                        <td className="money">
                          {formatter.format(transaction.amount)}
                        </td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return (
        <p className="loading">
          <img src="/loading.gif" />
        </p>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allTransactions: state.transactions.allTransactions
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(SpendingByCategory)
