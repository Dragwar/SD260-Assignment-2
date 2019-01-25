import React, { Component } from 'react';
import './MovieCard.css';


class MovieCard extends Component {

  render() {
    const { movie, index } = this.props;

    return (
      <li className={`MovieCard card-${index}`}>
        <h4 className="title">
          {movie.Title}
          <h6 className="year"> ({movie.Year})</h6>
        </h4>

        <div className="image-container">
          <img className="image" src={movie.Poster} alt="Movie Poster" height="150" width="100" />
        </div>

        <div className="btn-container">
          <button className="watch-list">Want to Watch</button>
          <button className="already-watched-list">Watched</button>
        </div>
      </li>
    );
  }
}

export default MovieCard;
