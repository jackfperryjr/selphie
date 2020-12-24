import React from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom'
import selphie from '../icons/selphie.png'

function Navbar(props) {
  let user = null
  let src
  if (localStorage.user && localStorage.accessToken) {
    user = JSON.parse(localStorage.user)
    var photos = user.photos.filter(function(e){
      return e.portrait == 1
    });
    
    src = photos[0].url
  }

  return (
    <nav className='navbar navbar-expand navbar-light'>
    { 
        (user !== null) 
          ? 
              <span>
                <Link to='/index'><img className='selphie-sm' decoding='sync' src={selphie} alt='Selphie for MoogleApi' /></Link>
                <Link to='/feed' className='feed-link'>feed</Link>
                <Link to='/index' className='font-lobster'>selphie</Link>
                <Link to='/add'><div className='character-add'><i className="fas fa-user-plus"></i></div></Link>
                <Link to='/profile'><img className='img-navbar' src={src} alt={user.userName}/></Link>
              </span>

          : <Link to='/login' className='font-lobster'>selphie</Link>
        } 
    </nav>
    )
}

export default Navbar
