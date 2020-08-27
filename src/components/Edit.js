import React, { useState, useEffect } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from '../components/Navbar'
import defaultImage from '../images/no-image.png'
import image1 from '../images/no-image-01.png'
import image2 from '../images/no-image-02.png'
import image3 from '../images/no-image-03.png'
import image4 from '../images/no-image-04.png'

const useFetch = url => {
  const [character, setCharacter] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const character = await response.json()
    setCharacter(character[0])
  }

  useEffect(() => {fetchData()},[url])
  return character
}

function Edit(props) {
  const id = props.match.params.id
  const character = useFetch('https://www.moogleapi.com/api/v1/characters/' + id)
  const [c, setCharacter] = useState({})
  const [isVisible, setVisible] = useState(false)
  const token = JSON.parse(localStorage.token)
  const [overlay, setOverlay] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function handleChange (e) {
    let key = e.target.name
    let value = e.target.value
    setCharacter({ ...character, [key]: value })
    console.log(c)
  }

  function handlePhotoUpload (e) {
    e.preventDefault()
    console.log('not implemented')
  }

  function handleStatAdd (e) {
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      let payload = new FormData()
      payload.append('platform', document.getElementById('1').querySelector('[name="platform"]').value)
      payload.append('class', document.getElementById('1').querySelector('[name="class"]').value)
      payload.append('level', document.getElementById('1').querySelector('[name="level"]').value)
      payload.append('hitPoints', document.getElementById('1').querySelector('[name="hitPoints"]').value)
      payload.append('manaPoints', document.getElementById('1').querySelector('[name="manaPoints"]').value)
      payload.append('attack', document.getElementById('1').querySelector('[name="attack"]').value)
      payload.append('defense', document.getElementById('1').querySelector('[name="defense"]').value)
      payload.append('magic', document.getElementById('1').querySelector('[name="magic"]').value)
      payload.append('magicDefense', document.getElementById('1').querySelector('[name="magicDefense"]').value)
      payload.append('agility', document.getElementById('1').querySelector('[name="agility"]').value)
      payload.append('spirit', document.getElementById('1').querySelector('[name="spirit"]').value)
      payload.append('collectionId', id)
      fetch('https://www.moogleapi.com/api/v1/stats/add/', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + token
        }, 
        body: payload
      }).then(function(response) {
        if (response.status === 200) {
          props.history.push('/edit' + id)
          return <Redirect to={'/edit' + id} />
        } else if (response.status === 401) {
          localStorage.clear()
          props.history.push('/login')
          return <Redirect to='/login' />
        } else if (response.status === 403) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot add stats')
        } else {
          console.log('add failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function handleStatUpdate (e, statId) {
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      let payload = new FormData()
      payload.append('id', statId)
      payload.append('platform', document.getElementById(''+statId+'').querySelector('[name="platform"]').value)
      payload.append('class', document.getElementById(''+statId+'').querySelector('[name="class"]').value)
      payload.append('level', document.getElementById(''+statId+'').querySelector('[name="level"]').value)
      payload.append('hitPoints', document.getElementById(''+statId+'').querySelector('[name="hitPoints"]').value)
      payload.append('manaPoints', document.getElementById(''+statId+'').querySelector('[name="manaPoints"]').value)
      payload.append('attack', document.getElementById(''+statId+'').querySelector('[name="attack"]').value)
      payload.append('defense', document.getElementById(''+statId+'').querySelector('[name="defense"]').value)
      payload.append('magic', document.getElementById(''+statId+'').querySelector('[name="magic"]').value)
      payload.append('magicDefense', document.getElementById(''+statId+'').querySelector('[name="magicDefense"]').value)
      payload.append('agility', document.getElementById(''+statId+'').querySelector('[name="agility"]').value)
      payload.append('spirit', document.getElementById(''+statId+'').querySelector('[name="spirit"]').value)
      debugger
      fetch('https://www.moogleapi.com/api/v1/stats/update/' + statId, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token
        }, 
        body: payload
      }).then(function(response) {
        if (response.status === 200) {
          props.history.push('/edit' + id)
          return <Redirect to={'/edit' + id} />
        } else if (response.status === 401) {
          localStorage.clear()
          props.history.push('/login')
          return <Redirect to='/login' />
        } else if (response.status === 403) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot update stats')
        } else {
          console.log('update failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function handleStatDelete (e, statId) {
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      fetch('https://www.moogleapi.com/api/v1/stats/delete/' + statId, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        if (response.status === 200) {
          props.history.push('/edit' + id)
          return <Redirect to={'/edit' + id} />
        } else if (response.status === 401) {
          localStorage.clear()
          props.history.push('/login')
          return <Redirect to='/login' />
        } else if (response.status === 403) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot delete stats')
        } else {
          console.log('delete failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function handleCharacterUpdate (e) {
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      let payload = new FormData()
      payload.append('id', id)
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
      fetch('https://www.moogleapi.com/api/v1/characters/update/' + id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: payload
      }).then(function(response) {
        if (response.status === 200) {
          props.history.push('/edit' + id)
          return <Redirect to={'/edit' + id} />
        } else if (response.status === 401) {
          localStorage.clear()
          props.history.push('/login')
          return <Redirect to='/login' />
        } else if (response.status === 403) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot update character')
        } else {
          console.log('update failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function handleCharacterDelete (e) {
    e.preventDefault()
    if (validateForm()) {
      setOverlay(true)
      fetch('https://www.moogleapi.com/api/v1/characters/delete/' + id, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        if (response.status === 200) {
          props.history.push('/')
          return <Redirect to='/' />
        } else if (response.status === 401) {
          localStorage.clear()
          props.history.push('/login')
          return <Redirect to='/login' />
        } else if (response.status === 403) {
          setOverlay(false)
          setShow(true)
          console.log('user cannot delete character')
        } else {
          console.log('delete failed')
          console.log(response.errors)
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function handleToggle (e) { 
    let x = document.getElementsByClassName('stat-container'), i
    for (i = 0; i < x.length; i += 1) {
        x[i].style.display = 'none'
    }

    document.getElementById(e.target.value).style.display = 'block'
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

  if (character) {
    let x = character
    let primaryImage 
    
    if (x.pictures[0]) {
      x.pictures.map(i => {(i.primary === 1) ? primaryImage = i.url : primaryImage = defaultImage})
    } else {
      primaryImage = defaultImage
    }

    return (
      <div>
        <Navbar />
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
          <span className='loader text-primary'><i className='fas fa-circle-notch fa-spin fa-5x'></i></span>
        </div>
          <form name='character-form' id='character-form' encType='multipart/form-data' method='put'>
            <div className='row'>
              <div className='col-sm-8 col-md-8'>
                <div className='row'>
                  <div className='col-sm-6 col-md-6'>
                    <img className='img-character-profile' src={primaryImage} alt={x.name} />
                    <div className='row justify-content-center'>
                      <div className='col-xs-6 col-sm-6 col-md-6 col-lg-3 m-0 p-0'>
                        <img className='img-character-profile-collection' src={image1} alt={x.name} />
                      </div>
                      <div className='col-xs-6 col-sm-6 col-md-6 col-lg-3 m-0 p-0'>
                        <img className='img-character-profile-collection' src={image2} alt={x.name} />
                      </div>
                      <div className='col-xs-6 col-sm-6 col-md-6 col-lg-3 m-0 p-0'>
                        <img className='img-character-profile-collection' src={image3} alt={x.name} />
                      </div>
                      <div className='col-xs-6 col-sm-6 col-md-6 col-lg-3 m-0 p-0'>
                        <img className='img-character-profile-collection' src={image4} alt={x.name} />
                      </div>
                    </div>
                    <button type='submit' title='Update Photos' className='btn btn-primary btn-profile' onClick={e => { handlePhotoUpload(e) }}>Update Photos</button>
                  </div>
                  <div className='col-sm-6 col-md-6'>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='name'
                        defaultValue={x.name} 
                        placeholder='character name' 
                      />
                      <label>name</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='japaneseName'
                        defaultValue={x.japaneseName} 
                        placeholder='japanese name' 
                      />
                      <label>japanese name</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='age'
                        defaultValue={x.age} 
                        placeholder='age'
                      />
                      <label>age</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='gender'
                        defaultValue={x.gender} 
                        placeholder='gender'
                      />
                      <label>gender</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='race'
                        defaultValue={x.race} 
                        placeholder='race'
                      />
                      <label>race</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='job'
                        defaultValue={x.job} 
                        placeholder='job'
                      />
                      <label>class</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='height'
                        defaultValue={x.height} 
                        placeholder='height'
                      />
                      <label>height</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='weight'
                        defaultValue={x.weight} 
                        placeholder='weight'
                      />
                      <label>weight</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='origin'
                        defaultValue={x.origin} 
                        placeholder='origin'
                      />
                      <label>origin</label>
                    </div>
                  </div>
                  <div className='col-sm-12 col-md-12'>
                    <div className='input-group input-group-override floating-label'>
                        <textarea className='character-form-control floating-textarea' name='description'
                          defaultValue={x.description} 
                          placeholder='description'>
                        </textarea>
                        <label>description</label>
                      </div>
                      <div className='button-container float-right'>
                        <button type='submit' title='Delete' className='btn btn-secondary btn-profile mr-2' onClick={e => { handleCharacterDelete(e) }}>Delete Character</button>
                        <button type='submit' title='Save' className='btn btn-primary btn-profile ml-2' onClick={e => { handleCharacterUpdate(e) }}>Update Character</button>
                      </div>
                  </div>
                </div>
              </div>
              <div className='col-sm-4 col-md-4'>
                <select id='stat-select' className='form-control stat-select mb-25' onChange={e => { handleToggle(e)} }>
                {x.stats.length > 0
                  ? <option value='0'>Select a stat model...</option>
                  : <option value='0'>No stats entered...</option>
                }
                <option value='1'>Add a new stat model...</option>
                {x.stats.length > 0
                  ?  x.stats.map
                        (x =>
                          <option key={x.id} value={x.id}>{x.platform} - {x.class} - level: {x.level}</option>
                        )
                  : <></>
                }
                </select>
                <div id='0' style={{display: (isVisible) ? 'block' : 'none'}} className='stat-container'></div>
                <div id='1' style={{display: (isVisible) ? 'block' : 'none'}} className='stat-container'>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='platform'
                        placeholder='platform'
                      />
                    <label>platform</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='class'
                      placeholder='class'
                    />
                    <label>class</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='level'
                      placeholder='level'
                    />
                    <label>level</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='hitPoints'
                      placeholder='hit points'
                    />
                    <label>hit points</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='manaPoints'
                      placeholder='mana points'
                    />
                    <label>mana points</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='attack'
                      placeholder='attack'
                    />
                    <label>attack</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='defense'
                      placeholder='defense'
                    />
                    <label>defense</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='magic'
                      placeholder='magic'
                    />
                    <label>magic</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='magicDefense'
                      placeholder='magic defense'
                    />
                    <label>magic defense</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='agility'
                      placeholder='agility'
                    />
                    <label>agility</label>
                  </div>
                  <div className='input-group input-group-override floating-label'>
                    <input type='text' className='form-control floating-input' name='spirit'
                      placeholder='spirit'
                    />
                    <label>spirit</label>
                  </div>
                  <div className='button-container float-right'>
                    <button type='submit' title='Save Stats' className='btn btn-primary btn-profile' onClick={e => { handleStatAdd(e) }}>Add Stats</button>
                  </div>
                </div>
                {x.stats.map
                  (x => 
                    <div id={x.id} key={x.id} style={{display: (isVisible) ? 'block' : 'none'}} className='stat-container'>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='platform'
                        defaultValue={x.platform} 
                        placeholder='platform'
                      />
                      <label>platform</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='class'
                        defaultValue={x.class} 
                        placeholder='class'
                      />
                      <label>class</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='level'
                        defaultValue={x.level} 
                        placeholder='level'
                      />
                      <label>level</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='hitPoints'
                        defaultValue={x.hitPoints} 
                        placeholder='hit points'
                      />
                      <label>hit points</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='manaPoints'
                        defaultValue={x.manaPoints} 
                        placeholder='mana points'
                      />
                      <label>mana points</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='attack'
                        defaultValue={x.attack} 
                        placeholder='attack'
                      />
                      <label>attack</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='defense'
                        defaultValue={x.defense} 
                        placeholder='defense'
                      />
                      <label>defense</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='magic'
                        defaultValue={x.magic} 
                        placeholder='magic'
                      />
                      <label>magic</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='magicDefense'
                        defaultValue={x.magicDefense} 
                        placeholder='magic defense'
                      />
                      <label>magic defense</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='agility'
                        defaultValue={x.agility} 
                        placeholder='agility'
                      />
                      <label>defense</label>
                    </div>
                    <div className='input-group input-group-override floating-label'>
                      <input type='text' className='form-control floating-input' name='spirit'
                        defaultValue={x.spirit} 
                        placeholder='spirit'
                      />
                      <label>spirit</label>
                    </div>
                    <div className='button-container float-right'>
                        <button type='submit' title='Delete' className='btn btn-secondary btn-profile mr-2' onClick={e => { handleStatDelete(e, x.id) }}>Delete Stats</button>
                        <button type='submit' title='Update Stats' className='btn btn-primary btn-profile ml-2' onClick={e => { handleStatUpdate(e, x.id) }}>Update Stats</button>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Navbar />
        <span className='loader text-primary'><i className='fas fa-circle-notch fa-spin fa-2x'></i> Loading...</span>
      </div>
    )
  }
}

export default Edit
