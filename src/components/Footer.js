import React, { useState } from 'react'
import { BrowserRouter as Router, Link} from 'react-router-dom'

function Footer(props) {
  let user = null
  if (localStorage.user && localStorage.token) {
    user = JSON.parse(localStorage.user)
  }

  function handleClick (component) {
    localStorage.setItem('component', JSON.stringify(component))
  }

  if (localStorage.component) {
    return (
      <footer>
          <div className='d-flex justify-content-center'>
              <Link to='/feed' className={JSON.parse(localStorage.component) === 'feed' ? 'footer-active' : ''} onClick={e => {handleClick('feed')}}><i className="fas fa-stream"></i></Link>
              <Link to='/' className={JSON.parse(localStorage.component) === 'index' ? 'footer-active' : ''} onClick={e => {handleClick('index')}}><i className="fas fa-clipboard-list"></i></Link>
              <Link to='/add' className={JSON.parse(localStorage.component) === 'add' ? 'footer-active' : ''} onClick={e => {handleClick('add')}}><span className='small'>+</span><i className="fas fa-scroll"></i></Link>
              <Link to='/profile' className={JSON.parse(localStorage.component) === 'profile' ? 'footer-active' : ''} onClick={e => {handleClick('profile')}}><i className="fas fa-user-alt"></i></Link>
          </div>
      </footer>
      )
  } else {
    return (
      <footer>
        <div className='d-flex justify-content-center'>
            <Link to='/feed' onClick={e => {handleClick('feed')}}><i className="fas fa-stream"></i></Link>
            <Link to='/' onClick={e => {handleClick('index')}}><i className="fas fa-clipboard-list"></i></Link>
            <Link to='/add' onClick={e => {handleClick('add')}}><span className='small'>+</span><i className="fas fa-scroll"></i></Link>
            <Link to='/profile' onClick={e => {handleClick('profile')}}><i className="fas fa-user-alt"></i></Link>
        </div>
    </footer>
    )
  }
}

export default Footer
