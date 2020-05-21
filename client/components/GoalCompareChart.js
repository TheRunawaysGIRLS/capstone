import React from 'react'
import {connect} from 'react-redux'
import {fetchGoalsFromServer} from '../store/goals'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

import {
  VictoryBar,
  VictoryLine,
  VictoryPolarAxis,
  VictoryAxis,
  VictoryLabel,
  VictoryChart,
  VictoryArea,
  VictoryTheme,
  VictoryPie,
  VictoryTooltip,
  VictoryLegend,
  VictoryScatter,
  VictoryGroup,
  VictoryStack,
  VictoryPortal,
  CustomBar
} from 'victory'

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts'

import {ResponsiveLine} from 'nivo'

let goalCurrent = [
  {x: 'Food', y: 6},
  {x: 'Gas', y: 13},
  {x: 'Entertainment', y: 17},
  {x: 'Travel', y: 76},
  {x: 'Others', y: 38}
]
let goalTarget = [
  {x: 'Food', y: 12},
  {x: 'Gas', y: 13},
  {x: 'Entertainment', y: 20},
  {x: 'Travel', y: 40},
  {x: 'Others', y: 60}
]

//Mazuma Colors Added

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

export class GoalCompareChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGoal: '',
      viewAll: true
    }
  }

  componentDidMount() {
    this.props.getGoals()
  }

  handleClick() {
    this.props.getGoals()
  }

  render() {
    let goals = this.props.allGoals

    let DataVizPage

    if (goals) {
      let goalTempCurrent = goals.map(goal => ({
        x: goal.name,
        y: Number(goal.currentAmount).toFixed(2) / 1
      }))
      let goalTempTarget = goals.map(goal => ({
        x: goal.name,
        y: Number(goal.targetAmount).toFixed(2) / 1
      }))

      goalTarget = goalTempTarget
      goalCurrent = goalTempCurrent

      DataVizPage = (
        <div>
          <VictoryDemo />
        </div>
      )
    }

    return (
      <div>
        <h2 className="headercenter">Goals - Target VS Current</h2>{' '}
        {DataVizPage}
      </div>
    )
  }
}

function VictoryDemo() {
  return (
    <VictoryChart height={550} width={700} padding={70} domainPadding={{x: 20}}>
      {/* <VictoryLabel text="Goals - Target VS Current" x={300} y={3} textAnchor="right" /> */}

      <VictoryAxis
        dependentAxis
        label="Amount"
        theme={VictoryTheme.material}
        //offsetX={200}
        //sstandalone={false}
        style={{
          axis: {stroke: '#756f6a'},
          axisLabel: {fontSize: 20, padding: 40},
          grid: {stroke: ({tick}) => (tick > 0.5 ? 'grey' : 'grey')},
          ticks: {stroke: 'grey', size: 5},
          tickLabels: {fontSize: 15, padding: 0}
        }}
      />
      <VictoryBar
        data={goalCurrent}
        style={{
          data: {width: 30, fill: colors.mzgreen}
        }}
      />
      <VictoryLine
        interpolation="cardinal"
        data={goalTarget}
        label="LINE"
        style={{
          data: {stroke: colors.mzred, strokeWidth: 3}
        }}
      />
      <VictoryScatter
        data={goalTarget}
        size={5}
        style={{
          data: {
            fill: colors.mzblue,
            stroke: colors.mzblue,
            strokeWidth: 15
          },
          labels: {padding: 10, fontSize: 10}
        }}
      />
      <VictoryAxis
        scale="linear"
        style={{
          axis: {stroke: 'black'},
          grid: {strokeWidth: 1},
          ticks: {stroke: colors.mzred, size: 10},
          tickLabels: {fontSize: 11},
          axisLabel: {fontsize: 20}
        }}
      />

      <VictoryLegend
        x={410}
        y={517}
        centerTitle
        orientation="horizontal"
        gutter={10}
        style={{border: {stroke: 'black'}, title: {fontSize: 20}}}
        data={[
          {name: 'Target', symbol: {fill: colors.mzmagenta, type: 'circle'}},
          {name: 'Current ', symbol: {fill: colors.mzgreen, type: 'square'}}
        ]}
      />
    </VictoryChart>
  )
}

const mapState = state => {
  return {
    allGoals: state.goals.allGoals
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    getGoals: () => dispatch(fetchGoalsFromServer())
  }
}

export default connect(mapState, mapDispatch)(GoalCompareChart)
