import React, { useState } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import moment from 'moment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Profile(props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [photo, setPhoto] = useState('')
  const user = JSON.parse(localStorage.user)

  function handleLogout () {
    localStorage.clear()
    props.history.push('/login')
    return <Redirect to='/login' />
  }

  function handleUserUpdate (e) {
    e.preventDefault()
    const token = localStorage.token
    const user = JSON.parse(localStorage.user)
    if (validateForm()) {
      let payload = new FormData()
      payload.append('id', user.id)
      payload.append('photo', (photo === '') ? user.photo : document.forms['profile-form']['upload-photo'].files[0])
      payload.append('username', (username === '') ? user.userName : username)
      payload.append('email', (email === '') ? user.email : email)
      payload.append('firstname', (firstname === '') ? user.firstName : firstname)
      payload.append('lastname', (lastname === '') ? user.lastName : lastname)
      payload.append('age', (age === '') ? user.age : age)
      payload.append('birthdate', (birthdate === '') ? user.birthDate : birthdate)
      payload.append('city', (city === '') ? user.city : city)
      payload.append('state', (state === '') ? user.state : state)
      fetch('https://chocoboapi.azurewebsites.net/v1/manage/update', {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: payload
      }).then(response => response.json())
        .then(function(response) {
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          } else {
            console.log('update failed')
            console.log(response.errors)
          }
        })
    } else {
      console.log('validation failed')
    }
  }

  function handlePhotoUpload () {
    document.getElementById('upload-photo').click()
  }

  function handleProfilePhotoChange (e) {
    let img = URL.createObjectURL(e.target.files[0]);
    if (img) {
      document.getElementById('profile-photo').src = img
      setPhoto(e.target.value)
    }
  }

  function validateForm () {
    let error = 0

    if (error === 1) {
      document.getElementById('validation-error').style.display = 'block'
      return false
    } else {
      document.getElementById('validation-error').style.display = 'none'
      return true
    }
  }

  return (
    <div>
      <Navbar />
      <div className='form-container form-container-profile component'>
        <div className='profile-container'>
          <img id='profile-photo' className='profile-photo' src={user.photo} alt={user.userName} onClick={handlePhotoUpload}/>
        </div>
        <form name='profile-form' id='profile-form' className='profile-form' encType='multipart/form-data' method='put'>
          <p className='font-weight-bold login-username'>{user.userName}</p>
          <p className='font-small text-secondary'>Joined {moment(user.joinDate).format('MMMM DD, YYYY')}</p>
          <div className='input-group'>
              <input type='text' className='form-control login-username' defaultValue={user.userName} placeholder='user name'  onChange={e => { setUsername(e.target.value) }} />
              </div>
          <div className='input-group'>
              <input type='text' className='form-control' defaultValue={user.email} placeholder='email' onChange={e => { setEmail(e.target.value) }} />
          </div>
          <div className='input-group'>
              <input type='text' className='form-control' defaultValue={user.firstName} placeholder='first name' onChange={e => { setFirstname(e.target.value) }} />
              </div>
          <div className='input-group'>
              <input type='text' className='form-control' defaultValue={user.lastName} placeholder='last name'  onChange={e => { setLastname(e.target.value) }} />
          </div>
          <div className='input-group'>
              <input type='number' className='form-control' defaultValue={user.age} placeholder='00' onChange={e => { setAge(e.target.value) }} />
              </div>
          <div className='input-group'>
              <input type='date' className='form-control' defaultValue={moment(user.birthDate).format('YYYY-MM-DD')}  onChange={e => { setBirthdate(e.target.value) }} />
          </div>
          <div className='input-group'>
              <input type='text' className='form-control' defaultValue={user.city} placeholder='city' onChange={e => { setCity(e.target.value) }} />
              </div>
          <div className='input-group'>
              <input type='text' className='form-control' defaultValue={user.state} placeholder='state' onChange={e => { setState(e.target.value) }} />
          </div>
          <div id='validation-error'>form validation failed</div>
          <input id="upload-photo" type="file" accept="image/*" name="photo" onChange={e => { handleProfilePhotoChange(e) }} />
          <div className='button-container'>
            <div className='row'>
              <div className='col-md-12'>
                <p title='Logout' className='text-muted' onClick={handleLogout}>Logout</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <p title='Update Information' className='text-muted' onClick={e => { handleUserUpdate(e) }}>Update Info</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
