import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUserNavBar} from '../store/module'

export class UserNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userNavBar: []
    }
  }

  componentDidMount() {
    this.props.getUserNavBar(this.props.userId)
  }

  render() {
    console.log('this props UserNavBar ==>', this.props)
    console.log('this STATE IN RENDER  UserNavBar ==>', this.state)
    return (
      <spam>
        {this.props.userNavBar.map(nav => {
          //linknav.map(nav => {
          return <Link to={nav.link}>{nav.name}</Link>
        })}
      </spam>
    )
  }
}

const mapState = state => {
  console.log('IN mapState==> UserNavBar.js ', state)

  return {
    userNavBar: state.UserModules.userNavBar,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  console.log('IN DISPATCH==> UserNavBar.js ')
  return {
    getUserNavBar: userId => dispatch(fetchUserNavBar(userId))
  }
}

export default connect(mapState, mapDispatch)(UserNavBar)