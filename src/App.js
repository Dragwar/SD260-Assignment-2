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
  state = {
    checkMovieID: [],
    selectedMovies: [],

    results: {
      response: "False",
      movies: [],
      totalResults: 0,
      error: "",
    },
  }

  addMovie = (movie, event) => {
    event.preventDefault();
    let movieClone = { ...movie };

    this.setState((prevState) => ({
      checkMovieID: [...new Set([movieClone.imdbID, ...prevState.checkMovieID])],
    }));

    if (!this.state.checkMovieID.includes(movieClone.imdbID)) {
      if (event.target.name === "watched" && !movieClone.wantToWatch) {
        movieClone.watched = true;

      } else if (event.target.name === "wantToWatch" && !movieClone.watched) {
        movieClone.wantToWatch = true;
      }

      movieClone.isAdded = true;

      this.setState((prevState) => ({
        selectedMovies: [movieClone, ...prevState.selectedMovies],
      }));

    } else {
      console.warn(`${movieClone.Title} is already in your list`);
    }
  }


  setData = (newData) => {
    // console.log('fetched data:', newData);

    if (newData.Response === "False" || newData.Response === "false" || newData.Response === false) {
      this.setState((prevState) => ({
        results: {
          response: newData.Response,
          movies: [],
          totalResults: 0,
          error: newData.Error
        }
      }));

    } else {
      this.setState((prevState) => ({
        results: {
          response: newData.Response,
          movies: [...newData.Search].map((movie) => ({ ...movie, watched: false, wantToWatch: false })),
          totalResults: newData.totalResults,
          error: "",
        }
      }));
    }
  }

  render() {
    const { selectedMovies, results } = this.state;
    console.log('selected movies:', this.state.selectedMovies);

    return (
      <div className="App">
        <NavBar />
        <Route
          exact
          path="/"
          component={() => (
            <MoviesListsPage
              selectedMovies={selectedMovies}
              results={results}
              setData={this.setData}
            />
          )}
        />
        <Route
          exact
          path="/search"
          component={() => (
            <SearchMoviesPage
              addMovie={this.addMovie}
              results={results}
              setData={this.setData}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
