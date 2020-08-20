import React, {useState} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthContext } from './context/auth'
import PrivateRoute from './PrivateRoute'
import login from './components/Login'
import profile from './components/Profile'
import index from './components/Index'
import edit from './components/Edit'
import add from './components/Add'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App(props) {
  const existingToken = JSON.parse(localStorage.getItem('token'));
  const [authToken, setAuthToken] = useState(existingToken);
  
  const setToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthToken(data);
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Router basename='/strago'>
        <PrivateRoute exact path='/' component={index} />
        <Route path='/login' component={login} />
        <PrivateRoute path='/profile' component={profile} />
        <PrivateRoute path='/index' component={index} />
        <PrivateRoute path='/add' component={add} />
        <PrivateRoute path='/edit/:id' component={edit} />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
