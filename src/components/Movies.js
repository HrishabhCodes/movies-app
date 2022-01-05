import React, { Component } from "react";
// import { movies } from "./getmovies";
import axios from "axios";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      favorites: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=04028eeaa1fb6fb7c196009618a0f1e4&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }

  changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=04028eeaa1fb6fb7c196009618a0f1e4&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };

  handleClick = (value) => {
    if (value != this.state.currPage) {
      this.setState(
        {
          currPage: value,
        },
        this.changeMovies
      );
    }
  };

  handleRight = () => {
    let temparr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temparr.push(i);
    }
    this.setState(
      {
        parr: [...temparr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };

  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };

  handleFavorites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if (this.state.favorites.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id != movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("movies-app", JSON.stringify(oldData));
    console.log(oldData);
    this.handleFavoritesState();
  };

  handleFavoritesState = () => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldData.map((movie) => movie.id);
    this.setState({
      favorites: [...temp],
    });
  };

  render() {
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className="loader-cont">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-center trending-header">
              <strong>Trending</strong>
            </h1>
            <div className="movies-cont">
              {this.state.movies.map((movieObj) => {
                return (
                  <div
                    className="card movies-card"
                    onMouseEnter={() => this.setState({ hover: movieObj.id })}
                    onMouseLeave={() => this.setState({ hover: "" })}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                      alt={
                        movieObj.original_title
                          ? movieObj.original_title
                          : movieObj.original_name
                      }
                      className="card-img-top movies-image"
                    />
                    <div className="card-body movies-body">
                      <h5 className="card-title movies-title">
                        <strong>
                          {movieObj.original_title
                            ? movieObj.original_title
                            : movieObj.original_name}
                        </strong>
                      </h5>
                      {/* <p className="card-text movies-text">
                        {movieObj.overview}
                      </p> */}
                      <div className="btn-cont">
                        {this.state.hover == movieObj.id && (
                          <a
                            onClick={() => this.handleFavorites(movieObj)}
                            className="btn btn-dark movies-btn"
                          >
                            {this.state.favorites.includes(movieObj.id)
                              ? "Remove from Favorites"
                              : "Add to Favorites"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pagination-cont">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={this.handleLeft}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {this.state.parr.map((value) =>
                    value === this.state.currPage ? (
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={() => this.handleClick(value)}
                          style={{
                            backgroundColor: "#fa3b3b",
                            color: "white",
                          }}
                        >
                          {value}
                        </a>
                      </li>
                    ) : (
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={() => this.handleClick(value)}
                        >
                          {value}
                        </a>
                      </li>
                    )
                  )}
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={this.handleRight}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
