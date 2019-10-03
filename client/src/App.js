import React from 'react';
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import ContentBody from "./components/ContentBody";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <main className="main-container">
        <Header />
        <Navigation />
        <ContentBody />
        <Footer />
      </main>
    </div>
  );
}

export default App;
