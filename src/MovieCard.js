import React, { Component } from 'react';
import './MovieCard.css';

class MovieCard extends Component {

  render() {
    const { movie, index, addMovie } = this.props;

    return (
      <li className={`MovieCard card-${index}`}>
        <h4 className="title">
          {movie.Title}
          <span> </span>
          <span className="year">
            ({movie.Year})
            </span>
        </h4>

        <div className="image-container">
          <img
            className="image"
            src={movie.Poster}
            alt="Movie Poster"
            height="250"
            width="200"
            draggable="false"
          />
        </div>

        {/**@todo MUST HIDE BOTH BUTTONS AFTER PRESSING ONE OF THE BUTTONS */}
        {
          addMovie && (
            <div className={`btn-container ${index}`}>
              <button
                name="wantToWatch"
                className="watch-list"
                onClick={(event) => addMovie(movie, event)}
              >
                Want to Watch
              </button>
              <button
                name="watched"
                className="already-watched-list"
                onClick={(event) => addMovie(movie, event)}
              >
                Watched
              </button>
            </div>
          )
        }
      </li>
    );
  }
}

export default MovieCard;
