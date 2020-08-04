import React, { Component } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import * as utils from '../utility'

class Edit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      character: {},
      loading: true,
      id: this.props.match.params.id
    }

    //this.onChange = this.onChange.bind(this);
  }

  componentDidMount () {
    this.getCharacter()
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

  handleCancel (e) {
    this.props.history.push('/strago/index')
    return <Redirect to='/strago/index' />
  }

  handleChange (e) {
    let key = e.target.name
    let value = e.target.value
    this.setState(prevState => ({ character: { ...prevState.character, [key]: value }}))
  }

  handleCharacterUpdate (e) {
    e.preventDefault()
    let that = this
    const token = sessionStorage.token
    if (this.validateForm()) {
      let payload = new FormData()
      payload.append('id', this.state.character.id)
      //payload.append('photo', (this.state.photo === '') ? character.photo : document.forms['profile-form']['upload-photo'].files[0])
      payload.append('name', this.state.character.name)
      payload.append('japaneseName', this.state.character.japaneseName)
      payload.append('age', this.state.character.age)
      payload.append('gender', this.state.character.gender)
      payload.append('race', this.state.character.race)
      payload.append('job', this.state.character.job)
      payload.append('height', this.state.character.height)
      payload.append('weight', this.state.character.weight)
      payload.append('origin', this.state.character.origin)
      payload.append('description', this.state.character.description)
      fetch('https://www.moogleapi.com/api/v1/characters/update/' + this.state.id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: payload
      }).then(response => response.json())
        .then(function(response) {
          if (response.character) {
            that.handleCancel(e)
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
    // let error = 0

    // if (error === 1) {
    //   document.getElementById('validation-error').style.display = 'block'
    //   return false
    // } else {
    //   document.getElementById('validation-error').style.display = 'none'
    //   return true
    // }
    return true
  }

  render () {
    const loading = this.state.loading
    const x = this.state.character
    let primary 
    let render
    
    if (this.isLoggedIn) {
      if (loading) {
        render =  <div>
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
                            <input type='text' className='form-control' name='name'
                              defaultValue={x.name} 
                              placeholder='character name' 
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='japaneseName'
                              defaultValue={x.japaneseName} 
                              placeholder='japanese name' 
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='age'
                              defaultValue={x.age} 
                              placeholder='age'
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='gender'
                              defaultValue={x.gender} 
                              placeholder='gender'
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='race'
                              defaultValue={x.race} 
                              placeholder='race'
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='job'
                              defaultValue={x.job} 
                              placeholder='job'
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='height'
                              defaultValue={x.height} 
                              placeholder='height'
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='weight'
                              defaultValue={x.weight} 
                              placeholder='weight'
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <input type='text' className='form-control' name='origin'
                              defaultValue={x.origin} 
                              placeholder='origin'
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className='input-group input-group-override'>
                            <textarea className='character-form-control' name='description'
                              defaultValue={x.description} 
                              placeholder='description'
                              onChange={(e) => this.handleChange(e)}>
                            </textarea>
                          </div>
                        </div>
                      </div>
                      <div className='button-container'>
                        <button type='cancel' title='Cancel' className='btn btn-secondary btn-profile' onClick={(e) => this.handleCancel(e)}>Cancel</button>
                        <button type='submit' title='Delete' className='btn btn-danger btn-profile'>Delete</button>
                        <button type='submit' title='Save' className='btn btn-success btn-profile' onClick={(e) => this.handleCharacterUpdate(e)}>Save</button>
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
