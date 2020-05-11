import React from 'react'
import {connect} from 'react-redux'
import {fetchDemoData} from '../store/demoViz'

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

let data = [
  {x: 'Food', y: 6},
  {x: 'Gas', y: 13},
  {x: 'Entertainment', y: 17},
  {x: 'Travel', y: 76},
  {x: 'Others', y: 38}
]
let budget = [
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

const MazumaColors = ['#384780', '#4CB38A', '#8F3B76', '#FFF1F8', '#E62663']

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {data[index].x}
    </text>
  )
}

const CustomizedLabel = ({x, y, fill, value}) => {
  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fontSize="16"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="middle"
    >
      {' '}
      {x} %
    </text>
  )
}

let tooltip
const CustomTooltip = ({active, payload}) => {
  if (!active || !tooltip) return null
  for (const bar of payload)
    if (bar.dataKey === tooltip)
      return (
        <div>
          {bar.name}
          <br />
          {bar.value.toFixed(2)}
        </div>
      )
  return null
}

const createSampleData = () => {
  try {
    let data = Axios.post('/api/plaid/transactions/get')
    return data
  } catch (err) {
    console.error(err)
  }
}

export class DataViz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      budgets: [],
      transactions: []
    }
  }

  componentDidMount() {
    console.log('component Did Mount', this.props)
    this.props.getDemoDataFromStore()
  }

  render() {
    let budgets = this.props.budgets
    let transactions = this.props.transactions
    console.log('PROPS IN DATAVIZ SEE==> ', this.props)
    console.log('budgets==> ', budgets)
    console.log('transactions ==> ', transactions)

    let DataVizPage

    if (budgets) {
      let budgettemp = budgets.map(budget => ({
        x: budget.category,
        y: budget.amount
      }))

      let TransactionsByCategory = transactions.map((transaction, index) => ({
        category: transaction.category[0],
        amount: transaction.amount
      }))

      const categories = {}
      let category = ''
      let amount = 0

      for (let i = 0; i < TransactionsByCategory.length; i++) {
        category = TransactionsByCategory[i].category
        amount = Number(TransactionsByCategory[i].amount)

        if (categories[category] === undefined) {
          categories[category] = 0
          categories[category] += amount
        } else {
          categories[category] += amount
        }
      }

      let datatemp = []
      let objectrow = {}

      for (let key in categories) {
        objectrow.x = key
        objectrow.y = categories[key]
        datatemp.push(objectrow)
        objectrow = {}
      }

      data = datatemp
      budget = budgettemp

      console.log('budget before rendering==> ', budget)
      console.log('data before rendering ==> ', data)
      console.log('is data an array  ==> ', Array.isArray(data))
      console.log('this.state  ==> ', this.state)

      DataVizPage = (
        <div>
          <h1>Expenses By Category</h1>

          <h2>Victory</h2>
          <VictoryDemo />

          <h2>Recharts</h2>
          <RechartsDemoArea />
          <RechartsDemoPie />

          <h2>Nivo</h2>

          <NivoDemo />
        </div>
      )
    }

    return <div>{DataVizPage}</div>
  }
}

function VictoryDemo() {
  console.log('in VictoryDemo', data)
  return (
    <div style={{maxWidth: '800px', margin: '0 auto'}}>
      {/* AREA AreaChart */}
      <VictoryChart theme={VictoryTheme.material} width={800} height={400}>
        <VictoryArea
          data={data}
          labels={({datum}) => datum.y}
          style={{data: {fill: colors.mzgreen}}}

          // 	labelComponent={
          // 	<VictoryTooltip
          // 		center={{ x: 225, y: 30 }}
          // 		pointerOrientation="bottom"
          // 		flyoutWidth={150}
          // 		flyoutHeight={50}
          // 		pointerWidth={150}
          // 		cornerRadius={0}
          // 	/>
          // }
        />
      </VictoryChart>

      {/* Horizontal Bar */}

      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        <VictoryChart
          theme={VictoryTheme.material}
          width={800}
          height={800}
          padding={(100, 0, 0, 100)}
          domainPadding={{x: 150}}
        >
          <VictoryAxis tickFormat={() => ''} style={{axis: {stroke: 'none'}}} />
          <VictoryBar
            horizontal
            cornerRadius={{top: 10, bottom: 10}}
            style={{
              data: {
                width: 50,
                fill: ({datum}) => (datum.x === 3 ? '#000000' : '#c43a31'),
                //fill: "#c43a31",
                stroke: ({index}) => (+index % 2 === 0 ? '#000000' : '#c43a31'),
                fillOpacity: 0.7,
                strokeWidth: 3
              },
              labels: {
                fontSize: 30,
                fill: ({datum}) => (datum.x === 3 ? '#000000' : '#c43a31')
              }
            }}
            data={data}
            labels={({datum}) => datum.x}
            padding={500}
          />
        </VictoryChart>
      </div>

      {/* Vertical Bar with lines */}

      <VictoryChart height={300} padding={50} domainPadding={{x: 20}}>
        {/* <VictoryLegend x={125} y={50} */}
        <VictoryLegend
          x={50}
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{border: {stroke: 'black'}, title: {fontSize: 20}}}
          data={[
            {name: 'Budget', symbol: {fill: colors.mzmagenta, type: 'circle'}},
            {name: 'Actual', symbol: {fill: colors.mzgreen, type: 'square'}}
          ]}
        />

        <VictoryAxis dependentAxis label="Amount" />
        <VictoryBar
          data={data}
          style={{
            data: {width: 30, fill: colors.mzgreen}
          }}
        />
        {/* <VictoryLine interpolation={"cardinal"}
					data={budget}
					label={"LINE"}
					style={{
						data: { stroke: "#6B6B6B", strokeWidth: 3 }
					}}
				/> */}
        <VictoryScatter
          data={budget}
          size={5}
          style={{
            data: {
              fill: colors.mzmagenta,
              stroke: colors.mzblue,
              strokeWidth: 2
            },
            labels: {padding: 5, fontSize: 5}
          }}
        />
        <VictoryAxis
          scale="linear"
          style={{
            axis: {stroke: 'black'},
            grid: {strokeWidth: 1},
            ticks: {stroke: 'black', size: 4},
            tickLabels: {fontSize: 12},
            axisLabel: {fontsize: 16}
          }}
        />
      </VictoryChart>

      {/* Vertical STACK Bar */}
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
          <VictoryBar data={budget} />
          <VictoryBar data={data} />
        </VictoryStack>
      </VictoryChart>

      {/* Pie Chart */}

      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        {/* Good Sample PLAIN PIE CHART */}
        {/* <VictoryPie
					colorScale={[colors.mzgreen, colors.mzmagenta, colors.mzred, colors.mzblue]}
					data={data}
					labels={({ datum }) => datum.x}
					labelComponent={<VictoryLabel angle={45} />}
					
						/> */}
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
    </div>
  )
}

function RechartsDemoArea() {
  return (
    <div style={{maxWidth: '800px', margin: '0 auto', height: '400px'}}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{top: 25, right: 25, bottom: 25, left: 0}}
        >
          <XAxis dataKey="x" />
          <YAxis dataKey="y" />
          <Area
            dataKey="y"
            // isAnimationActive={false}
            name="Actual"
            fill={colors.mzgreen}
            stroke={colors.mzblue}
          >
            <LabelList dataKey="y" position="top" offset={10} />
          </Area>
          <CartesianGrid stroke={colors.lightGrey} strokeDasharray="5 5" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>

      <div style={{maxWidth: '800px', margin: '0 auto', height: '400px'}}>
        <ResponsiveContainer>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Bar
              dataKey="y"
              barSize={30}
              // isAnimationActive={false}
              name="Actual"
              fill={colors.mzmagenta}
              stroke={colors.mzblue}
            >
              <LabelList dataKey="y" position="top" offset={10} />
            </Bar>
            <CartesianGrid stroke={colors.lightGrey} strokeDasharray="5 5" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RechartsDemoPie() {
  return (
    <div style={{maxWidth: '800px', margin: '0 auto', height: '600px'}}>
      <ResponsiveContainer>
        <PieChart width={800} height={400}>
          <Pie
            isAnimationActive={true}
            data={data}
            cx={120}
            cy={500}
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="y"
          >
            {data.map((entry, index) => (
              <Cell fill={MazumaColors[index % MazumaColors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function NivoDemo() {
  return (
    <div style={{maxWidth: '800px', margin: '0 auto', height: '400px'}}>
      <ResponsiveLine
        data={[
          {
            id: 'Actual',
            color: colors.mzgreen,
            data
          }
        ]}
        margin={{top: 25, right: 25, bottom: 25, left: 60}}
        xScale={{type: 'point'}}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto'
        }}
        colorBy={d => d.color}
        enableArea={true}
        useMesh={true}
      />
    </div>
  )
}

const mapState = state => {
  return {
    budgets: state.demoViz.data.budgets,
    transactions: state.demoViz.data.transactions
  }
}

const mapDispatch = dispatch => {
  console.log('IN DISPATCH==> DataViz.js ')
  return {
    getDemoDataFromStore: () => dispatch(fetchDemoData())
  }
}

export default connect(mapState, mapDispatch)(DataViz)
