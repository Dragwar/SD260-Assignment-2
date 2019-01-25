import React, { Component } from 'react';
import './MovieCard.css';


class MovieCard extends Component {

  render() {
    const { movie, index } = this.props;

    return (
      <li className="MovieCard">
        <h4 className="title">{movie.Title}</h4>
      </li>
    );
  }
}

export default MovieCard;
