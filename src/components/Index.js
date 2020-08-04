import React, { Component } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import * as utils from '../utility'

class Index extends Component {
  constructor (props) {
    super(props)

    this.state = {
      characters: [],
      loading: true
    }
  }

  componentDidMount () {
    this.getCharacters()
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

  getCharacters () {
    fetch('https://www.moogleapi.com/api/v1/characters')
      .then(response => response.json())
      .then(characters => {
        this.setState({ characters: characters, loading: false })
      }
    )
  }

  handleLogout (e) {
    sessionStorage.clear()
    this.props.history.push('/strago/login')
    return <Redirect to='/strago/login' />
  }

  validateForm() {
    let error = 0

    if (error === 1) {
      document.getElementById('validation-error').style.display = 'block'
      return false
    } else {
      document.getElementById('validation-error').style.display = 'none'
      return true
    }
  }

  render () {
    const loading = this.state.loading
    let render
    if (this.isLoggedIn) {
      if (loading) {
        render =  <div>
                    <span className='loading text-primary'><i className='fas fa-circle-notch fa-spin fa-5x'></i></span>
                  </div>
      } else {
        render = 
          <header className='form-container'>
            <div className='row no-margin justify-content-center'>
              {this.state.characters.map
                (x =>
                  <div className='card-character' key={x.id}>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center'>
                      <Link to={'/strago/edit/' + x.id}>
                      { 
                        (x.pictures[0]) 
                          ? <img className='img-character' src={x.pictures[0].url} alt={x.name} /> 
                          : <img className='img-character' src='/images/no-image.png' alt={x.name} />
                      } 
                      </Link>
                    </div>
                  </div>
                )
              }
            </div>
          </header>
        }
        return render
    } else {
      this.props.history.push('/strago/login')
      return <Redirect to='/strago/login' />
    }
  }
}

export default Index
