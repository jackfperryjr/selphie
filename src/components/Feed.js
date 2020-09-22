import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import defaultImage from '../images/no-image.png'
import selphie from '../icons/selphie.png'

const useFetch = url => {
  const [feed, setFeed] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const feed = await response.json()
    setFeed(feed)
  }

  useEffect(() => { fetchData() }, [url])
  return feed
}

function Feed(props) {
  const feed = useFetch('https://www.moogleapi.com/api/v1/characters') // Temporary until I build the feed.

  let user = null
  if (localStorage.user && localStorage.token) {
    user = JSON.parse(localStorage.user)
  }

  if (feed) {
    return ( 
      <>
      <Navbar />
      <div className='component'>
        <div className='mt-5 pt-4'>
            {feed.map
              (x =>
                <>
                <div className='row row-feed mx-3 mb-2'>
                    <div className='row my-1'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left'>
                            <img className='img-feed' src={user.photo} alt={user.userName} />
                            <span className='ml-3 align-top text-muted'>{user.userName}</span>
                        </div>
                    </div>
                    <div className='row mx-4'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left'>
                            {/* { 
                            (x.pictures[0]) 
                                ? <img className='img-character' src={x.pictures[0].url} alt={x.name} /> 
                                : <img className='img-character' src={defaultImage} alt={x.name} />
                            }  */}
                            <p>{x.description}</p>
                        </div>
                    </div>
                </div>
                </>
              )
            }
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
        <span className='loader text-primary'><i className="fab fa-superpowers fa-spin text-muted"></i></span>
      </div>
      <Footer />
      </>
    )
  }
}

export default Feed
