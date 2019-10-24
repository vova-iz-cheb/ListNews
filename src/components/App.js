import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ModalReg from '../Containers/ModalRegistationWindow'
import Home from './Home'
import Setting from './Setting'
import AddNews from '../Containers/AddNews'
import EditNews from '../Containers/EditNews'
import About from './About'
import NotFound from './NotFound'
import '../styles/style.scss'

export default class App extends Component {
  render() {
    return <Fragment>
      <ModalReg />
      <Header />
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/addnews' component={ AddNews } />
        <Route path='/setting' component={ Setting } />
        <Route path='/about' component={ About } />
        <Route path='/editnews' component={ EditNews } />
        <Route component={ NotFound } />
      </Switch>
      <Footer />
    </Fragment>
  }
}