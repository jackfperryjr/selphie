import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import login from './components/Login'
import profile from './components/Profile'
import index from './components/Index'
import edit from './components/Edit'
import add from './components/Add'
import './App.css'

class App extends Component {
  render () {
    let user = null
    if (sessionStorage.user) {
      user  = JSON.parse(sessionStorage.user)
    }
    return (
      <Router basename='/'>
        { 
          (user !== null) 
            ? <nav className='navbar navbar-expand navbar-light'>
                <span>
                  <Link to='/strago/index'><strong>MoogleApi - Characters</strong></Link>
                  <Link to='/strago/add'><span className='character-add'><i class='fas fa-plus-circle fa-2x'></i></span></Link>
                  <Link to='/strago/profile'><img className='img-navbar' src={user.photo} alt={user.userName}/></Link>
                </span>
              </nav>
            : <span>&nbsp;</span>
        } 

        <Route exact path='/strago' component={index} />
        <Route path='/strago/login' component={login} />
        <Route path='/strago/profile' component={profile} />
        <Route path='/strago/index' component={index} />
        <Route path='/strago/add' component={add} />
        <Route path='/strago/edit/:id' component={edit} />
      </Router>
    )
  }
}

export default App
