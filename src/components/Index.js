import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import defaultImage from '../images/no-image.png'
import selphie from '../icons/selphie.png'

const useFetch = url => {
  const [characters, setCharacters] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const characters = await response.json()
    setCharacters(characters)
  }

  useEffect(() => { fetchData() }, [url])
  return characters
}

function Index(props) {
  const characters = useFetch('https://www.moogleapi.com/api/v1/characters')

  if (characters) {
    return ( 
      <>
      <Navbar />
      <div className='component'>
        <div className='form-container'>
          <div className='row mx-3 justify-content-center'>
            {characters.map
              (x =>
                <div className='card-character' key={x.id}>
                  <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center'>
                    <Link to={'/edit/' + x.id}>
                    { 
                      (x.pictures[0]) 
                        ? <img className='img-character' src={x.pictures[0].url} alt={x.name} /> 
                        : <img className='img-character' src={defaultImage} alt={x.name} />
                    } 
                    <h6 className='text-center'>{x.name}</h6>
                    </Link>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
      </>
    )
  } else {
    return (
      <>
      <Navbar />
      <div className='component'>
        <span className='loader text-primary'><img className='selphie-index fa-spin' src={selphie} /></span>
      </div>
      <Footer />
      </>
    )
  }
}

export default Index
