import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
// import * as __API__ from './API.json';
import './App.css';
import NavBar from './NavBar';
import SearchMoviesPage from './SearchMoviesPage';
import MoviesListsPage from './MoviesListsPage';

class App extends Component {


  render() {
    return (
      <div className="App">
        <NavBar />
        <Route
          exact
          path="/"
          component={() => (
            <MoviesListsPage />
          )}
        />
        <Route
          exact
          path="/search"
          component={() => (
            <SearchMoviesPage />
          )}
        />
      </div>
    );
  }
}

export default App;
