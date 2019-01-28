import React, { Component } from 'react';
import './MoviesListsPage.css';
import MovieCard from './MovieCard';

class MoviesListsPage extends Component {


  render() {
    const { selectedMovies } = this.props;

    return (
      <div className="MoviesListsPage">
        {
          selectedMovies.length === 0 && (
            <>
              <h3>Nothing here yet...</h3>
              <p>see the search movies page to add movies</p>
            </>
          )
        }

        {
          selectedMovies && selectedMovies.filter((movie) => !movie.wantToWatch).length > 0 && (
            <h3>Movies You Want To Watch</h3>
          )
        }
        <ul className="watched-movies">
          {
            selectedMovies && selectedMovies.filter((movie) => !movie.watched).map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                index={index}
              />
            ))
          }
        </ul>

        {
          selectedMovies && selectedMovies.filter((movie) => !movie.watched).length > 0 && (
            <h3>Movies That You Watched Already</h3>
          )
        }
        <ul className="unwatched-movies">
          {
            selectedMovies && selectedMovies.filter((movie) => !movie.wantToWatch).map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                index={index}
              />
            ))
          }
        </ul>
      </div>

    );
  }
}

export default MoviesListsPage;
