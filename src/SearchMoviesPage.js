import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import * as __API__ from './API.json';
import './SearchMoviesPage.css';
import MovieCard from './MovieCard';

class SearchMoviesPage extends Component {
  state = {
    query: "",
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  handleChange = (event, tgt) => {
    event.preventDefault();
    this.setState((prevState) => ({
      [tgt.name]: tgt.value
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state

    if (query === "") {
      alert('please fill out the movie search field');
      return;
    }

    console.log('---------------------------------------------');
    console.log(query);
    console.log('submitted', { query });

    this.searchInput.focus();
    this.resetForm();
    console.log('Form Reset');
    console.log('---------------------------------------------');
    this.fetchTitle(query);
  }

  resetForm = () => {
    this.setState((prevState) => ({
      query: ""
    }));
  }

  fetchTitle = (movieTitle, pageNum = 1) => {
    fetch(`${__API__.HOST}apikey=${__API__.MY_API_KEY}&s=${movieTitle}&type=movie&page=${pageNum}`)
      .then(response => response.json())
      .then(data => this.props.setData(data))
      .catch(err => console.warn("THIS IS A FETCH ERROR:", err));
  }

  render() {
    const { query } = this.state;
    const { results, addMovie } = this.props;

    return (
      <div className="SearchMoviesPage">
        <form
          className="movie-search-form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input
            id="query-input"
            name="query"
            type="text"
            placeholder="Movie Name"
            value={query}
            onChange={(event) => this.handleChange(event, event.target)}
            ref={(input) => { this.searchInput = input; }}
          />
          <input type="submit" value="Search" />
        </form>

        <p className="total-results">
          {
            results.totalResults > 0 && (
              <span>Total Results: {results.totalResults}</span>
            )
          }
        </p>

        <ul className="search-results">
          {
            (results.response === "True" || results.response === "True" || results.response === true) && results.movies.map((movie, index) => (
              <MovieCard
                key={index}
                index={index}
                movie={movie}
                addMovie={addMovie}
              />
            ))
          }
          {
            (results.response === "False" || results.response === "false" || results.response === false) && (
              <li className="search-error">
                <p>{results.error}</p>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default SearchMoviesPage;
