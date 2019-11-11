import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import config from './config.json'

// Components
import ReactNotifications from 'react-notifications-component'
import Header from './components/Header'
import Navigation from './components/Navigation'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

// Config
axios.defaults.baseURL = config.proxy

export default () => (
  <Router>
    <ReactNotifications />
    <div className="App">
      <main className="main-container">
        <Header />
        <Navigation />
        <MainContent />
        <Footer />
      </main>
    </div>
  </Router>
)
