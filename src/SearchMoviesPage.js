import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import * as __API__ from './API.json';
import './SearchMoviesPage.css';
import MovieCard from './MovieCard';

class SearchMoviesPage extends Component {
  state = {
    query: "",
    data: {
      response: "False",
      movies: [],
      totalResults: 0,
      error: "",
    },
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  handleChange = (tgt) => {
    this.setState((prevState) => ({
      [tgt.name]: tgt.value
    }));
    console.log(`changed ${tgt.name} to`, tgt.value);
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

  setData = (newData) => {
    console.log('fetched data:', newData);

    if (newData.Response === "False" || newData.Response === "false" || newData.Response === false) {
      this.setState((prevState) => ({
        data: {
          response: newData.Response,
          movies: [],
          totalResults: 0,
          error: newData.Error
        }
      }));

    } else {
      this.setState((prevState) => ({
        data: {
          response: newData.Response,
          movies: newData.Search,
          totalResults: newData.totalResults,
          error: "",
        }
      }));
    }
  }

  fetchTitle = (movieTitle, pageNum = 1) => {
    fetch(`${__API__.HOST}apikey=${__API__.MY_API_KEY}&s=${movieTitle}&type=movie&page=${pageNum}`)
      .then(response => response.json())
      .then(data => this.setData(data))
      .catch(err => console.warn("THIS IS A FETCH ERROR: line 48-52, error =", err))
  }

  render() {
    const { query, data } = this.state;
    console.log('my state data:', data);

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
            onChange={(event) => this.handleChange(event.target)}
            ref={(input) => { this.searchInput = input; }}
          />
          <input type="submit" value="Search" />
        </form>

        <p className="total-results">
          {
            data.totalResults > 0 && (
              <span>Total Results: {data.totalResults}</span>
            )
          }
        </p>

        <ul className="search-results">
          {
            (data.response === "True" || data.response === "True" || data.response === true) && data.movies.map((movie, index) => (
              <MovieCard
                key={index}
                index={index}
                movie={movie}
              />
            ))
          }
          {
            (data.response === "False" || data.response === "false" || data.response === false) && (
              <li className="search-error">
                <p>{data.error}</p>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default SearchMoviesPage;
