import React, { useState, useEffect } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import Navbar from '../components/Navbar'
import defaultImage from '../images/no-image.png'

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

  function handleCancel () {
    this.props.history.push('/index')
    return <Redirect to='/index' />
  }

  function handleChange (e) {
    let key = e.target.name
    let value = e.target.value
    setCharacter({ ...character, [key]: value })
    console.log(c)
  }

  function handleCharacterUpdate (e) {
    e.preventDefault()
    const token = localStorage.token
    if (validateForm()) {
      let payload = new FormData()
      payload.append('id', character.id)
      payload.append('name', character.name)
      payload.append('japaneseName', character.japaneseName)
      payload.append('age', character.age)
      payload.append('gender', character.gender)
      payload.append('race', character.race)
      payload.append('job', character.job)
      payload.append('height', character.height)
      payload.append('weight', character.weight)
      payload.append('origin', character.origin)
      payload.append('description', character.description)
      fetch('https://www.moogleapi.com/api/v1/characters/update/' + id, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: payload
      }).then(response => response.json())
        .then(function(response) {
          if (response.character) {
            handleCancel()
          } else {
            console.log('update failed')
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
          <form name='character-form' id='character-form' encType='multipart/form-data' method='put'>
            <div className='row'>
              <div className='col-sm-4 col-md-4'>
                <img className='img-character-profile' src={primaryImage} alt={x.name} />
                <div className='row'>
                  <div className='col-sm-6 col-md-6'>
                    <img className='img-character-profile-collection' src={defaultImage} alt={x.name} />
                  </div>
                  <div className='col-sm-6 col-md-6'>
                    <img className='img-character-profile-collection' src={defaultImage} alt={x.name} />
                  </div>
                  <div className='col-sm-6 col-md-6'>
                    <img className='img-character-profile-collection' src={defaultImage} alt={x.name} />
                  </div>
                  <div className='col-sm-6 col-md-6'>
                    <img className='img-character-profile-collection' src={defaultImage} alt={x.name} />
                  </div>
                </div>
              </div>
              <div className='col-sm-4 col-md-4'>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='name'
                    defaultValue={x.name} 
                    placeholder='character name' 
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='japaneseName'
                    defaultValue={x.japaneseName} 
                    placeholder='japanese name' 
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='age'
                    defaultValue={x.age} 
                    placeholder='age'
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='gender'
                    defaultValue={x.gender} 
                    placeholder='gender'
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='race'
                    defaultValue={x.race} 
                    placeholder='race'
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='job'
                    defaultValue={x.job} 
                    placeholder='job'
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='height'
                    defaultValue={x.height} 
                    placeholder='height'
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='weight'
                    defaultValue={x.weight} 
                    placeholder='weight'
                    onChange={e => { handleChange(e) }}
                  />
                </div>
                <div className='input-group input-group-override'>
                  <input type='text' className='form-control' name='origin'
                    defaultValue={x.origin} 
                    placeholder='origin'
                    onChange={e => { handleChange(e) }}
                  />
                </div>
              </div>
              <div className='col-sm-4 col-md-4'>
                <select id='stat-select' className='form-control' onChange={e => { handleToggle(e)} }>
                <option value='0'>Select a stat model...</option>
                {x.stats.length > 0
                  ?  x.stats.map
                        (x =>
                          <option key={x.id} value={x.id}>{x.platform} - {x.class} - level: {x.level}</option>
                        )
                  : <option>No stats entered...</option>
                }
                </select>
                <div id='0' style={{display: (isVisible) ? 'block' : 'none'}} className='stat-container'></div>
                {x.stats.map
                  (x => 
                    <div id={x.id} key={x.id} style={{display: (isVisible) ? 'block' : 'none'}} className='stat-container'>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='platform'
                        defaultValue={x.platform} 
                        placeholder='platform'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='platform'
                        defaultValue={x.class} 
                        placeholder='class'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='platform'
                        defaultValue={x.level} 
                        placeholder='level'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='hitpoints'
                        defaultValue={x.hitpoints} 
                        placeholder='hitpoints'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='manapoints'
                        defaultValue={x.manapoints} 
                        placeholder='manapoints'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='attack'
                        defaultValue={x.attack} 
                        placeholder='attack'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='defense'
                        defaultValue={x.defense} 
                        placeholder='defense'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='magic'
                        defaultValue={x.magic} 
                        placeholder='magic'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='magicdefense'
                        defaultValue={x.magicdefense} 
                        placeholder='magicdefense'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='agility'
                        defaultValue={x.agility} 
                        placeholder='agility'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-override'>
                      <input type='text' className='form-control' name='spirit'
                        defaultValue={x.spirit} 
                        placeholder='spirit'
                        // onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    </div>
                  )
                }
              </div>
              <div className='col-sm-12 col-md-12'>
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
              <button type='cancel' title='Cancel' className='btn btn-secondary btn-profile' onClick={handleCancel}>Cancel</button>
              <button type='submit' title='Delete' className='btn btn-danger btn-profile'>Delete</button>
              <button type='submit' title='Save' className='btn btn-success btn-profile' onClick={e => { handleCharacterUpdate(e) }}>Save</button>
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
