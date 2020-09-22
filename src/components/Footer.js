import React from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom'

function Footer(props) {
    let user = null
    if (localStorage.user && localStorage.token) {
      user = JSON.parse(localStorage.user)
    }

    function handleClick (e) {

    }

  return (
    <footer>
        <div className='d-flex justify-content-center'>
            <Link to='/feed'><i className="fas fa-stream"></i></Link>
            <Link to='/'><i className="fas fa-clipboard-list"></i></Link>
            <Link to='/add'><span className='small'>+</span><i className="fas fa-scroll"></i></Link>
            <Link to='/profile'><i className="fas fa-address-card"></i></Link>
        </div>
    </footer>
    )
}

export default Footer
