import React, {Component} from 'react'
import CheckBox from './CheckBox'

class UserModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modules: [
        {id: 5, name: 'Real Estate\n', isChecked: true},
        {id: 6, name: 'Investing\n', isChecked: true},
        {id: 7, name: 'Auto', isChecked: false},
        {id: 8, name: 'Businesses\n', isChecked: false},
        {id: 9, name: '401k\n', isChecked: false},
        {id: 1, name: 'Budget\n', isChecked: true},
        {id: 10, name: 'Test Module', isChecked: false},
        {id: 14, name: 'Budgettest', isChecked: false},
        {id: 3, name: 'Goals', isChecked: true},
        {id: 15, name: 'Mariamodule', isChecked: false},
        {id: 2, name: 'NEW NAME', isChecked: true}
      ]
    }
  }

  handleAllChecked = event => {
    let modules = this.state.modules
    modules.forEach(module => (module.isChecked = event.target.checked))
    this.setState({modules: modules})
  }

  handleCheckChieldElement = event => {
    let modules = this.state.modules
    modules.forEach(module => {
      if (module.name === event.target.value)
        module.isChecked = event.target.checked
    })
    this.setState({modules: modules})
  }

  render() {
    return (
      <div className="modules">
        <h1> Please select/diselect </h1>
        <input
          type="checkbox"
          onClick={this.handleAllChecked}
          name="checkedall"
        />{' '}
        Check / Uncheck All
        <ul>
          {this.state.modules.map(module => {
            return (
              <CheckBox
                handleCheckChieldElement={this.handleCheckChieldElement}
                {...module}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

// const modules = [
// 	{
// 		"id": 5,
// 		"name": "Real Estate\n"
// 	},
// 	{
// 		"id": 6,
// 		"name": "Investing\n"
// 	},
// 	{
// 		"id": 7,
// 		"name": "Auto"
// 	},
// 	{
// 		"id": 8,
// 		"name": "Businesses\n"
// 	},
// 	{
// 		"id": 9,
// 		"name": "401k\n"
// 	},
// 	{
// 		"id": 1,
// 		"name": "Budget\n"
// 	},
// 	{
// 		"id": 10,
// 		"name": "Test Module"
// 	},
// 	{
// 		"id": 14,
// 		"name": "Budgettest"
// 	},
// 	{
// 		"id": 3,
// 		"name": "Goals"
// 	},
// 	{
// 		"id": 15,
// 		"name": "Mariamodule"
// 	},
// 	{
// 		"id": 2,
// 		"name": "NEW NAME"
// 	}
// ]

// const userModules = [
// 	{
// 		"id": 2,
// 		"name": "NEW NAME",
// 		"users": [
// 			{
// 				"id": 1
// 			}
// 		]
// 	},
// 	{
// 		"id": 3,
// 		"name": "Goals",
// 		"users": [
// 			{
// 				"id": 1
// 			}
// 		]
// 	},
// 	{
// 		"id": 1,
// 		"name": "Budget\n",
// 		"users": [
// 			{
// 				"id": 1
// 			}
// 		]
// 	},
// 	{
// 		"id": 5,
// 		"name": "Real Estate\n",
// 		"users": [
// 			{
// 				"id": 1
// 			}
// 		]
// 	},
// 	{
// 		"id": 6,
// 		"name": "Investing\n",
// 		"users": [
// 			{
// 				"id": 1
// 			}
// 		]
// 	}
// ]

// const userModulesArr = userModules.map(module => (
// 	module.id
// ));

// const modulesArr = modules.map(module => (
// 	userModulesArr.indexOf(module.id) !== -1 ?
// 		{
// 			id: module.id,
// 			name: module.name,
// 			isChecked: true
// 		} :
// 		{
// 			id: module.id,
// 			name: module.name,
// 			isChecked: false
// 		}
// ));
// this.state = {
// 	modules: [{ id: 5, name: 'Real Estate\n', isChecked: true },
// 	{ id: 6, name: 'Investing\n', isChecked: true },
// 	{ id: 7, name: 'Auto', isChecked: false },
// 	{ id: 8, name: 'Businesses\n', isChecked: false },
// 	{ id: 9, name: '401k\n', isChecked: false },
// 	{ id: 1, name: 'Budget\n', isChecked: true },
// 	{ id: 10, name: 'Test Module', isChecked: false },
// 	{ id: 14, name: 'Budgettest', isChecked: false },
// 	{ id: 3, name: 'Goals', isChecked: true },
// 	{ id: 15, name: 'Mariamodule', isChecked: false },
// 	{ id: 2, name: 'NEW NAME', isChecked: true }]
// }

export default UserModule
