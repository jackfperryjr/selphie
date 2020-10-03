import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import moment from 'moment'
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
  const feed = useFetch('https://www.moogleapi.com/api/v1/feeds') // Temporary until I build the feed.

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
                    <div className='col-xs-1 col-sm-1 col-md-4 col-lg-4'>
                        <img className='img-feed' src={x.userPhoto} alt={x.userName} />
                        <span className='ml-3 align-top text-muted'>{x.userName}</span>
                    </div>
                    <div className='col-xs-11 col-sm-11 col-md-11 col-lg-11'>
                        <div className='row mb-3'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left feed-text'>
                                {x.update === 1 ? <span><Link to={'/edit/' + x.characterId}>{x.characterName}</Link> was updated on {moment(x.timeStamp).format('MMMM DD, YYYY')}</span> : '' }
                                {x.addition === 1 ? <span>{x.characterName} was added on {moment(x.timeStamp).format('MMMM DD, YYYY')}</span> : '' }
                                {x.deletion === 1 ? <span>{x.characterName} was deleted on {moment(x.timeStamp).format('MMMM DD, YYYY')}</span> : '' }
                                {x.photoUpdate === 1 ? <span>{x.userFirstName} updated <Link to={'/edit/' + x.characterId}>{x.characterName}</Link>'s photo on {moment(x.timeStamp).format('MMMM DD, YYYY')}</span> : '' }
                                {x.statUpdate === 1 ? <span>{x.characterName} had some stats updated on {moment(x.timeStamp).format('MMMM DD, YYYY')}</span> : '' }
                                {x.statAddition === 1 ? <span><Link to={'/edit/' + x.characterId}>{x.characterName}</Link> had some stats added by {x.userFirstName} on {moment(x.timeStamp).format('MMMM DD, YYYY')}</span> : '' }
                                {x.statDeletion === 1 ? <span>{x.characterName} had some stats deleted {moment(x.timeStamp).format('MMMM DD, YYYY')}</span> : '' }
                            </div>
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
