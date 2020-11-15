import React from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom'
import selphie from '../icons/selphie.png'

function Navbar(props) {
    let user = null
    if (localStorage.user && localStorage.token) {
      user = JSON.parse(localStorage.user)
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
                <Link to='/add'><div className='character-add'><span className='small'>+</span><i className="fas fa-scroll"></i></div></Link>
                <Link to='/profile'><img className='img-navbar' src={user.photo} alt={user.userName}/></Link>
              </span>

          : <Link to='/login' className='font-lobster'>selphie</Link>
        } 
    </nav>
    )
}

export default Navbar
