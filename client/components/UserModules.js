import React, {Component} from 'react'
import {connect} from 'react-redux'
import CheckBox from './CheckBox'
import {Redirect} from 'react-router-dom'

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
    this.props.getAllModules()
    this.props.getUserModules(this.props.userId)
  }

  handleAllChecked = event => {
    let userModules = this.props.userModules
    userModules.forEach(module => (module.isChecked = event.target.checked))
    this.setState({userModules: userModules})
  }

  handleCheckChieldElement = event => {
    let userModules = this.props.userModules
    userModules.forEach(module => {
      if (module.name === event.target.value)
        module.isChecked = event.target.checked
    })
    this.setState({
      userModules: userModules
    })
  }
  reloadPage() {
    window.location.reload()
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

    this.setState({
      userModules: userModules
    })
    this.reloadPage()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="modules">
            <h1> Select/Deselect Module </h1>
            <p />
            <input
              type="checkbox"
              onClick={this.handleAllChecked}
              name="checkedall"
            />
            Check / Uncheck All
            <button type="submit" id="buttonleft">
              Save
            </button>
            <ul>
              {this.props.userModules.map(module => {
                return (
                  <CheckBox
                    handleCheckChieldElement={this.handleCheckChieldElement}
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
  return {
    getAllModules: () => dispatch(fetchAllModules()),
    getUserModules: userId => dispatch(fetchUserModules(userId)),
    updateUserModules: (userId, modules) =>
      dispatch(updateUserModulesThunk(userId, modules))
  }
}

export default connect(mapState, mapDispatch)(UserModule)
