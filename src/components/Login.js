import React, { Component } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      user: {},
      valid: false
    }
  }

  componentDidMount () {
    if (sessionStorage.token) {
      let user = JSON.parse(sessionStorage.user);
      this.setState({
        valid: true,
        user: user
      })
    }
  }

  validateForm () {
    if (this.state.username.length > 0 && this.state.username.length > 0) {
      return true
    } else {
      document.getElementById('validation-error').style.display = 'block'
      return false
    }
  }

  handleLogin (e) {
    e.preventDefault()
    document.getElementById('login-error').style.display = 'none'
    document.getElementById('validation-error').style.display = 'none'
    if (this.validateForm()) {
      const that = this
      const payload = {
        username: this.state.username,
        password: this.state.password,
        audience: 'MoogleApi'
      }
      fetch('https://chocoboapi.azurewebsites.net/v1/account/login', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(function(response){
          if (response.token) {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            that.setState({
              valid: true,
              user: response.user
            })
          } else {
            console.log('failed login')
            console.log(response.message)
            document.getElementById('login-error').style.display = 'block'
          }
        })
      } else {
        console.log('validation failed')
      }
  }

  render () {
    if (this.state.valid === true) {
      this.props.history.push('/strago/index')
      return <Redirect to='/strago/index' />
    } else {
      return (
        <header className='form-container login-screen'>
          <p>Enter credentials</p>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control login-username' placeholder='enter username' onChange={(e) => this.setState({ username: e.target.value })} />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='enter password' onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
            <div id='login-error'>invalid credentials</div>
            <div id='validation-error'>enter your credentials</div>
            <button type='submit' className='btn btn-primary btn-block' onClick={(e) => this.handleLogin(e)}>Login</button>
          </form>
        </header>
      )
    }
  }
}

export default Login
