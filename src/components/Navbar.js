import React from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom'
import moogleAPI from '../images/moogleapi.png'

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
                <Link to='/index'><img className='logo' src={moogleAPI} /><strong className='logo-title'>- Characters</strong></Link>
                <Link to='/add'><span className='character-add'><i className='fas fa-plus-circle fa-2x'></i></span></Link>
                <Link to='/profile'><img className='img-navbar' src={user.photo} alt={user.userName}/></Link>
              </span>

          : <span>&nbsp;</span>
        } 
    </nav>
    )
}

export default Navbar
