import React, { Component } from 'react';
import './MoviesListsPage.css';
import MovieCard from './MovieCard';

class MoviesListsPage extends Component {


  render() {


    return (
      <div className="MoviesListsPage">
        <ul className="watched-movies">
          {/* filter through movies to display watched-movies */}
        </ul>
        <ul className="unwatched-movies">
          {/* filter through movies to display unwatched-movies */}
        </ul>
      </div>
      
    );
  }
}

export default MoviesListsPage;
