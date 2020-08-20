import React from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom'

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
                <Link to='/index'><strong>MoogleApi - Characters</strong></Link>
                <Link to='/add'><span className='character-add'><i className='fas fa-plus-circle fa-2x'></i></span></Link>
                <Link to='/profile'><img className='img-navbar' src={user.photo} alt={user.userName}/></Link>
              </span>

          : <span>&nbsp;</span>
        } 
    </nav>
    )
}

export default Navbar
