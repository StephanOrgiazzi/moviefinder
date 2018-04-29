import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import BestMovies from './components/BestMovies/BestMovies';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-wrapper">
                    <Header />
                    <BestMovies />                    
                </div>
            </div>
        );
    }
}

export default App;
