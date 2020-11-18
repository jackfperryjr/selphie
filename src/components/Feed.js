import React, { useState, useEffect } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import moment from 'moment'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const useFetch = url => {
  const [feed, setFeed] = useState(null)

  async function fetchData() {
    const response = await fetch(url)
    const feed = await response.json()
    setFeed(feed)
  }

  useEffect(() => { fetchData() }, [url])
  return [feed, fetchData]
}

function Feed(props) {
  const [feed, fetchData] = useFetch('https://www.moogleapi.com/api/v1/feeds')

  async function handleReactionUpdate (e, id, reaction) {
    e.preventDefault()
    fetch('https://www.moogleapi.com/api/v1/feeds/'+ reaction +'/' + id, {
    method: 'put'
    }).then(function(response) {
        if (response.status === 200) {
            fetchData('https://www.moogleapi.com/api/v1/feeds')
        }
    })
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
                <div className='row row-feed mx-3 mb-2 pt-2'>
                    <div className='col-xs-1 col-sm-1 col-md-5 col-lg-5'>
                        <img className='img-feed' decoding='sync' src={x.userPhoto} alt={x.userName} />
                        <span className='ml-3 align-top text-muted'>{x.userName}</span>
                        <p className='feed-timestamp text-muted'>{moment(x.timeStamp).local().format('MMMM D, YYYY [at] h:mm a')}</p>
                    </div>
                    <div className='col-xs-11 col-sm-11 col-md-11 col-lg-11'>
                        <div className='row mb-3'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 text-left feed-text'>
                                {x.update === 1 ? <span><Link to={'/edit/' + x.characterId}>{x.characterName}</Link> had something updated in their general information.</span> : '' }
                                {x.addition === 1 ? <span><Link to={'/edit/' + x.characterId}>{x.characterName}</Link> was added to the API! Let's everybody welcome <Link to={'/edit/' + x.characterId}>{x.characterName}</Link> to the team!</span> : '' }
                                {x.deletion === 1 ? <span>{x.characterName} was deleted from the API. This is a sad day for the team. Let's all wish {x.characterName} the best in their success. May you find a place in a new API in the near future! (Coming soon, probably.)</span> : '' }
                                {x.photoUpdate === 1 ? <span>{x.userFirstName} changed <Link to={'/edit/' + x.characterId}>{x.characterName}</Link>'s photo. I guess it was time for a change.</span> : '' }
                                {x.statUpdate === 1 ? <span>{x.characterName} had some stats updated.</span> : '' }
                                {x.statAddition === 1 ? <span><Link to={'/edit/' + x.characterId}>{x.characterName}</Link> had some stats added by {x.userFirstName}. Life is full of leveling up.</span> : '' }
                                {x.statDeletion === 1 && x.deletion === 0 ? <span>{x.characterName} had some stats deleted. I guess they weren't needed.</span> : '' }
                            </div>
                        </div>
                        <div className='row text-muted pb-3 flex-row-reverse'>
                            <span className='pointer' onClick={e => { handleReactionUpdate(e, x.id, "love") }}><i className="far fa-heart"></i><span className='small feed-reaction-count'>{x.love}</span></span>
                            <span className='pointer' onClick={e => { handleReactionUpdate(e, x.id, "dislike") }}><i className="far fa-thumbs-down"></i><span className='small feed-reaction-count'>{x.dislike}</span></span>
                            <span className='pointer' onClick={e => { handleReactionUpdate(e, x.id, "like") }}><i className="far fa-thumbs-up"></i><span className='small feed-reaction-count'>{x.like}</span></span>
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
