import React, { Component } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'

class Edit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      character: {},
      loading: true,
      id: this.props.match.params.id
    }
  }

  componentDidMount () {
    this.getCharacter()
  }

  isLoggedIn () {
    if (sessionStorage.token && sessionStorage.token !== 'undefined') {
      return true
    } else {
      this.handleLogout()
      return false
    }
  }

  getCharacter () {
    fetch('https://www.moogleapi.com/api/v1/characters/' + this.state.id)
      .then(response => response.json())
      .then(character => {
        this.setState({ character: character[0], loading: false })
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
    const x = this.state.character
    let primary 
    let render
    
    if (this.isLoggedIn()) {
      if (loading) {
        render =  <div loading={loading}>
                    <span className='loading text-primary'><i className='fas fa-circle-notch fa-spin fa-5x'></i></span>
                  </div>
      } else {
        if (x.pictures[0]) {
          x.pictures.map(i => {(i.primary === 1) ? primary = i.url : primary = '/images/no-image.png'})
        } else {
          primary = '/images/no-image.png'
        }

        render =  <div className='container top-margin'>
                    <form name='character-form' id='character-form' encType='multipart/form-data' method='put'>
                      <div className='row'>
                        <div className='col-sm-4 col-md-4'>
                          <img className='img-character-profile' src={primary} alt={x.name} />
                        </div>
                        <div className='col-sm-8 col-md-8'>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.name} placeholder='character name' />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.japaneseName} placeholder='japanese name' />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.age} placeholder='age'/>
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.gender} placeholder='gender'/>
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.race} placeholder='race'/>
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.job} placeholder='job'/>
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.height} placeholder='height'/>
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.weight} placeholder='weight'/>
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' defaultValue={x.origin} placeholder='origin'/>
                          </div>
                          <div className='input-group input-group-override'>
                            <textarea className='character-form-control' defaultValue={x.description} placeholder='description'></textarea>
                          </div>
                        </div>
                      </div>
                      <div className='button-container'>
                        <button type='cancel' title='Cancel' className='btn btn-secondary btn-profile'>Cancel</button>
                        <button type='submit' title='Delete' className='btn btn-danger btn-profile'>Delete</button>
                        <button type='submit' title='Save' className='btn btn-success btn-profile'>Save</button>
                      </div>
                    </form>
                  </div>
        }
        return render
    } else {
      this.props.history.push('/strago/login')
      return <Redirect to='/strago/login' />
    }
  }
}

export default Edit
