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
    return (
      <span>
        {this.props.userNavBar.map((nav, index) => {
          //linknav.map(nav => {
          return (
            <Link key={index} to={nav.link}>
              <button id="button">{nav.name}</button>
            </Link>
          )
        })}
      </span>
    )
  }
}

const mapState = state => {
  return {
    userNavBar: state.UserModules.userNavBar,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    getUserNavBar: userId => dispatch(fetchUserNavBar(userId))
  }
}

export default connect(mapState, mapDispatch)(UserNavBar)
