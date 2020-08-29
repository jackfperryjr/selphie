import React from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom'

function Footer(props) {
    let user = null
    if (localStorage.user && localStorage.token) {
      user = JSON.parse(localStorage.user)
    }

  return (
    <footer>
        <div className='d-flex justify-content-center'>
            <Link to='/'><i className="fas fa-home"></i></Link>
            <Link to='/'><i className="fab fa-fort-awesome-alt"></i></Link>
            <Link to='/add'><i className="fas fa-plus-circle"></i></Link>
            <Link to='/profile'><i className="fas fa-user-circle"></i></Link>
        </div>
    </footer>
    )
}

export default Footer
