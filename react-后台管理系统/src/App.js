import React, { Component } from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Login from './pages/Login/login'
import Admin from './pages/Admin/admin'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Switch>
           <Route path='/login' component={Login}></Route>
           <Route path='/' component={Admin}></Route>
         </Switch>
      </BrowserRouter>
    )
  }
}

