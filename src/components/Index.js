import React, { Component } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'

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

  isLoggedIn () {
    if (sessionStorage.token && sessionStorage.token !== 'undefined') {
      return true
    } else {
      this.handleLogout()
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

  handleCharacterUpdate (e) {
    // TODO:
    e.preventDefault()
    const token = sessionStorage.token
    const user = JSON.parse(sessionStorage.user)
    if (this.validateForm()) {
      let payload = new FormData()
      payload.append('id', user.id)
      payload.append('photo', (this.state.photo === '') ? user.photo : document.forms['profile-form']['upload-photo'].files[0])
      payload.append('wallpaper', (this.state.wallpaper === '') ? user.wallpaper : document.forms['profile-form']['upload-wallpaper'].files[0])
      payload.append('username', (this.state.username === '') ? user.userName : this.state.username)
      payload.append('email', (this.state.email === '') ? user.email : this.state.email)
      payload.append('firstname', (this.state.firstname === '') ? user.firstName : this.state.firstname)
      payload.append('lastname', (this.state.lastname === '') ? user.lastName : this.state.lastname)
      payload.append('age', (this.state.age === '') ? user.age : this.state.age)
      payload.append('birthdate', (this.state.birthdate === '') ? user.birthDate : this.state.birthdate)
      payload.append('city', (this.state.city === '') ? user.city : this.state.city)
      payload.append('state', (this.state.state === '') ? user.state : this.state.state)
      fetch('https://chocoboapi.azurewebsites.net/v1/manage/update', {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: payload
      }).then(response => response.json())
        .then(function(response) {
          if (response.user) {
            sessionStorage.setItem('user', JSON.stringify(response.user));
          } else {
            console.log('update failed')
            console.log(response.errors)
          }
        })
    } else {
      console.log('validation failed')
    }
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
    if (this.isLoggedIn()) {
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
