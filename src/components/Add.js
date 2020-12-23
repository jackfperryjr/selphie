import React, { useState } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import { refresh } from '../utility'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import moogleImage from '../icons/moogle.png'

function Add(props) {
  const [overlay, setOverlay] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  function handleCharacterAdd (e) {
    refresh(JSON.parse(localStorage.accessToken))
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      let payload = new FormData()
      payload.append('name', document.querySelector('[name="name"]').value)
      payload.append('japaneseName', document.querySelector('[name="japaneseName"]').value)
      payload.append('age', document.querySelector('[name="age"]').value)
      payload.append('gender', document.querySelector('[name="gender"]').value)
      payload.append('race', document.querySelector('[name="race"]').value)
      payload.append('job', document.querySelector('[name="job"]').value)
      payload.append('height', document.querySelector('[name="height"]').value)
      payload.append('weight', document.querySelector('[name="weight"]').value)
      payload.append('origin', document.querySelector('[name="origin"]').value)
      payload.append('description', document.querySelector('[name="description"]').value)
      fetch('https://www.moogleapi.com/api/v1/characters/add', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.accessToken)
        },
        body: payload
      }).then(function(response) {
        if (response.status === 200) {
          return response.json().then((data) => {
            props.history.push('/edit/' + data.character.id)
            return <Redirect to={'/edit/' + data.character.id} />
          })
        } else if (response.status === 401) {
          // localStorage.clear()
          // props.history.push('/login')
          // return <Redirect to='/login' />
          console.log('Still got a 401, bro.')
        } else if (response.status === 403 || response.status === 405) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot add characters')
        } else {
          console.log('add failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function validateForm () {
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

  return (
    <>
    <Navbar />
    <div className='component'>
        <div className='container top-margin'>
          <Modal show={show} onHide={handleClose}
              {...props}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered >
              <Modal.Header>
                  <Modal.Title>Test Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Your account doesn't have access to make changes.</p>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>Close</Button>
              </Modal.Footer>
          </Modal>
        <div className='overlay' style={{display: (overlay) ? 'block' : 'none'}}>
          <span className='loader text-primary'><i className="fab fa-superpowers fa-spin text-muted"></i></span>
        </div>
          <form name='character-form' id='character-form' encType='multipart/form-data' method='put'>
            <div className='row'>
              <div className='col-sm-12 col-md-12'>
                <div className='row'>
                <div className='col-sm-6 col-md-6'>
                  <img className='img-character-profile tilt moogle' src={moogleImage} alt='Add a new character!' />
                  <p className='mt-5 font-weight-bold'>You'll be able to upload pictures and add/edit stats after the initial creation.</p>
                </div>
                  <div className='col-sm-6 col-md-6'>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='name'
                        placeholder='character name' 
                      />
                      <label>name</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='japaneseName'
                        placeholder='japanese name' 
                      />
                      <label>japanese name</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='age'
                        placeholder='age'
                      />
                      <label>age</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='gender'
                        placeholder='gender'
                      />
                      <label>gender</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='race'
                        placeholder='race'
                      />
                      <label>race</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='job'
                        placeholder='class'
                      />
                      <label>class</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='height'
                        placeholder='height'
                      />
                      <label>height</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='weight'
                        placeholder='weight'
                      />
                      <label>weight</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='origin'
                        placeholder='origin'
                      />
                      <label>origin</label>
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-12'>
                    <div className='input-group input-group-override floating-label'>
                        <textarea className='character-form-control floating-textarea' name='description'
                          placeholder='description'>
                        </textarea>
                        <label>description</label>
                      </div>
                      <div className='button-container'>
                        <p title='Add Character' className='text-muted pointer' onClick={e => { handleCharacterAdd(e) }}>Add Character</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      </>
  )
}

export default Add
