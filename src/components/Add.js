import React, { Component } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import * as utils from '../utility'

class Add extends Component {
  constructor (props) {
    super(props)

    this.state = {
      character: {}
    }
  }

  componentWillUnmount () {
    this.setState = (state, callback) => {
        return
    }
  }

  isLoggedIn () {
    if (sessionStorage.token && sessionStorage.token !== 'undefined') {
      if (this.isTokenExpired(sessionStorage.token)) {
        this.handleLogout()
        return false
      }
      return true
    } else {
      this.handleLogout()
      return false
    }
  }

  isTokenExpired () {
    const token = utils.decodeJWT(sessionStorage.token).token
    const date = new Date()
    if (token.exp < date) {
      return true
    } else {
      return false
    }
  }

  handleLogout (e) {
    sessionStorage.clear()
    this.props.history.push('/strago/login')
    return <Redirect to='/strago/login' />
  }

  render () {
    let render
    
    if (this.isLoggedIn) {
      render =  <div className='container top-margin'>
                  <div className='row'>TODO: Build form to handle adding a character</div>
                </div>
      return render
    } else {
      this.props.history.push('/strago/login')
      return <Redirect to='/strago/login' />
    }
  }
}

export default Add
