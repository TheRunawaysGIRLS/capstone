import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/transactions'
import {VictoryLabel, VictoryPie} from 'victory'

/**
 * COMPONENT
 */
export class SpendCatPie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: ''
    }
  }
  componentDidMount() {
    this.props.fetchTransactions()
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

    return (
      <div className="spend-cat-dash">
        <h2>Spending by Category</h2>
        <div className="dashboard-viz">
          <VictoryPie
            colorScale={[
              colors.mzgreen,
              colors.mzmagenta,
              colors.mzred,
              colors.mzblue,
              colors.mzpink
            ]}
            data={data}
            width={550}
            height={550}
            padding={110}
            innerRadius={70}
            labelRadius={120}
            padAngle={2}
            labelRadius={({outerRadius}) => outerRadius + 20}
            style={{labels: {fill: '#384780', fontSize: 30}}}
            labels={({datum}) => datum.y}
            labelComponent={<VictoryLabel text={({datum}) => datum.x} />}
          />
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
    allTransactions: state.transactions.allTransactions
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(SpendCatPie)
