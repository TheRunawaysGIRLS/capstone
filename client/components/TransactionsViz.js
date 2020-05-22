import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import {fetchTransactions} from '../store/transactions'
import {fetchAccounts} from '../store/accounts'
import UserAccounts from './UserAccounts'

import {
  VictoryBar,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryChart,
  VictoryTooltip,
  VictoryLegend,
  VictoryScatter,
  CustomBar
} from 'victory'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const colors = {
  teal: 'hsl(174, 100%, 29%)',
  blueGrey: '#607D8B',
  lightGrey: '#eee',
  mzblue: '#384780',
  mzgreen: '#4CB38A',
  mzmagenta: '#8F3B76',
  mzpink: '#FFF1F8',
  mzred: '#E62663'
}

/**
 * COMPONENT
 */
export class TransactionsViz extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleAccountClick = this.handleAccountClick.bind(this)
    this.handleAllClick = this.handleAllClick.bind(this)
    this.state = {
      selectedAccount: '',
      viewAll: true
    }
  }
  componentDidMount() {
    this.props.fetchTransactions()
    this.props.fetchAccounts()
  }

  handleClick() {
    this.props.fetchTransactions()
    this.props.fetchAccounts()
  }

  handleAccountClick(e) {
    this.setState({
      selectedAccount: e.target.name,
      viewAll: false
    })
  }

  handleAllClick(e) {
    this.setState({
      viewAll: true
    })
  }

  render() {
    let allTransactions = this.props.allTransactions
    let allAccounts = this.props.allAccounts
    let data = []

    for (let i = 0; i < allTransactions.length; i++) {
      let currTransaction = allTransactions[i]
      if (currTransaction.amount > 0) {
        let currData = {
          x: currTransaction.date,
          y: currTransaction.amount
        }
        data.push(currData)
      }
    }

    if (allTransactions.length) {
      return (
        <div>
          <VictoryChart
            height={800}
            width={1000}
            padding={150}
            domainPadding={{x: 50}}
          >
            <VictoryBar
              data={data}
              style={{
                data: {width: 30, fill: colors.mzmagenta}
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Amount Spent ($)"
              scale="linear"
              style={{
                axis: {stroke: 'black'},
                grid: {strokeWidth: 1},
                ticks: {stroke: 'black', size: 4},
                tickLabels: {fontSize: 26},
                axisLabel: {fontSize: 26, padding: 70}
              }}
            />
            <VictoryAxis
              independentAxis
              scale="linear"
              style={{
                axis: {stroke: 'black'},
                grid: {strokeWidth: 1},
                ticks: {stroke: 'black', size: 4},
                tickLabels: {fontSize: 26, angle: -90, padding: 80},
                axisLabel: {fontSize: 26, padding: 90}
              }}
            />
          </VictoryChart>
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
    allTransactions: state.transactions.allTransactions,
    allAccounts: state.accounts.allAccounts
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchAccounts: () => dispatch(fetchAccounts())
  }
}

export default connect(mapState, mapDispatch)(TransactionsViz)
