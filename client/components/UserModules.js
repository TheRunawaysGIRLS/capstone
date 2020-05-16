import React, {Component} from 'react'
import {connect} from 'react-redux'
import CheckBox from './CheckBox'

import {
  fetchAllModules,
  fetchUserModules,
  updateUserModulesThunk
} from '../store/module'

export class UserModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allModules: [],
      userModules: [],
      modules: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateUserModulesArr = this.updateUserModulesArr.bind(this)
  }

  componentDidMount() {
    console.log('component Did Mount', this.props)
    this.props.getAllModules()
    this.props.getUserModules(this.props.userId)
  }

  handleAllChecked = event => {
    let userModules = this.props.userModules
    userModules.forEach(module => (module.isChecked = event.target.checked))
    this.setState({userModules: userModules})
  }

  handleCheckChildElement = event => {
    let userModules = this.props.userModules
    userModules.forEach(module => {
      if (module.name === event.target.value)
        module.isChecked = event.target.checked
    })
    this.setState({userModules: userModules})
  }

  updateUserModulesArr = userModules => {
    const updateModulesUser = userModules.map(
      module => (module.isChecked ? module.id : '')
    )
    const updModules = updateModulesUser.filter(id => typeof id == 'number')

    return updModules
  }

  handleFormSubmit = event => {
    event.preventDefault()

    let userModules = this.props.userModules

    let modules = this.updateUserModulesArr(userModules)

    this.setState({
      modules: modules
    })

    this.props.updateUserModules(this.props.userId, modules)

    this.setState({userModules: userModules})
  }

  render() {
    console.log('this props ==>', this.props)
    console.log('this STATE IN RENDER ==>', this.state)
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="modules">
            <h1> select/diselect Module </h1>
            <input
              type="checkbox"
              onClick={this.handleAllChecked}
              name="checkedall"
            />{' '}
            Check / Uncheck All
            <button type="submit" className="account-button">
              Save
            </button>
            <ul>
              {this.props.userModules.map(module => {
                return (
                  <CheckBox
                    handleCheckChildElement={this.handleCheckChildElement}
                    {...module}
                  />
                )
              })}
            </ul>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allModules: state.UserModules.allModules,
    userModules: state.UserModules.userModules,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  console.log('IN DISPATCH==> UserModules.js ')
  return {
    getAllModules: () => dispatch(fetchAllModules()),
    getUserModules: userId => dispatch(fetchUserModules(userId)),
    updateUserModules: (userId, modules) =>
      dispatch(updateUserModulesThunk(userId, modules))
  }
}

export default connect(mapState, mapDispatch)(UserModule)
