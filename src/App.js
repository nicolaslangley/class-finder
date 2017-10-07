import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Masthead from './components/Masthead/Masthead';
import ClassList from './components/ClassList/ClassList';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Masthead />
        <ClassList />
        <Footer />
      </div>
    );
  }
}

export default App;
