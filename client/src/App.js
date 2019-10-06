import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import config from './config.json'

// Components
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"

// Config
axios.defaults.baseURL = config.proxy

function App() {
  return (
    <Router>
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
}

export default App
