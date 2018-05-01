import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import BestMovies from './components/BestMovies/BestMovies';
import AllMovies from './components/AllMovies/AllMovies';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-wrapper">
                    <Header />
                    <BestMovies />                
                    <AllMovies />                
                </div>
            </div>
        );
    }
}

export default App;
