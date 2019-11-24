import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import config from './config/config.json'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

// Components
import ReactNotifications from 'react-notifications-component'
import Header from './components/Header.jsx'
import Navigation from './components/Navigation.jsx'
import MainContent from './components/MainContent.jsx'
import Footer from './components/Footer.jsx'

// Actions
import { Verification } from './redux/actions/User'

// Config
axios.defaults.baseURL = config.proxy
axios.defaults.headers.common.nyxAuthToken = localStorage.token

export default () => {
  useEffect(() => {
    store.dispatch(Verification())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <ReactNotifications />
        <div className='App'>
          <main className='main-container'>
            <Header />
            <Navigation />
            <MainContent />
            <Footer />
          </main>
        </div>
      </Router>
    </Provider>
  )
}
