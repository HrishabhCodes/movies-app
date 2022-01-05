import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currGenre: "All Genres",
      movies: [],
      currText: "",
      limit: 5,
      currPage: 1,
      sortPop: "asc",
      sortRating: "asc",
    };
  }

  componentDidMount() {
    const genreIds = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let tempArr = [];
    data.forEach((movieObj) => {
      if (!tempArr.includes(genreIds[movieObj.genre_ids[0]])) {
        if (genreIds[movieObj.genre_ids[0]] != undefined) {
          tempArr.push(genreIds[movieObj.genre_ids[0]]);
        }
      }
    });
    tempArr.unshift("All Genres");
    this.setState({
      genres: [...tempArr],
      movies: [...data],
    });
  }

  handleGenreFilter = (genre) => {
    this.setState({
      currGenre: genre,
    });
  };

  sortPopularity = () => {
    let temp = this.state.movies;
    if (this.state.sortPop != "desc") {
      temp.sort(function (objA, objB) {
        return objB.popularity - objA.popularity;
      });
      this.setState({
        sortPop: "desc",
      });
    } else {
      temp.sort(function (objA, objB) {
        return objA.popularity - objB.popularity;
      });
      this.setState({
        sortPop: "asc",
      });
    }
    this.setState({
      movies: [...temp],
    });
  };

  sortRating = () => {
    let temp = this.state.movies;
    if (this.state.sortRating != "desc") {
      temp.sort(function (objA, objB) {
        return objB.vote_average - objA.vote_average;
      });
      this.setState({
        sortRating: "desc",
      });
    } else {
      temp.sort(function (objA, objB) {
        return objA.vote_average - objB.vote_average;
      });
      this.setState({
        sortRating: "asc",
      });
    }
    this.setState({
      movies: [...temp],
    });
  };

  handlePageChange = (page) => {
    this.setState({
      currPage: page,
    });
  };

  handleDelete = (id) => {
    let newArr = [];
    newArr = this.state.movies.filter((movie) => movie.id != id);
    this.setState({
      movies: [...newArr],
    });
    localStorage.setItem("movies-app", JSON.stringify(newArr));
  };

  render() {
    let genreIds = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filterArr = [];

    if (this.state.currText != "") {
      filterArr = this.state.movies.filter((movie) => {
        let title = movie.original_title
          ? movie.original_title.toLowerCase()
          : movie.original_name.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      });
    } else {
      filterArr = this.state.movies;
    }

    if (this.state.currGenre != "All Genres") {
      filterArr = this.state.movies.filter(
        (movie) => genreIds[movie.genre_ids[0]] == this.state.currGenre
      );
    }

    let pages = Math.ceil(filterArr.length / this.state.limit);
    let pagesArr = [];
    for (let i = 1; i <= pages; i++) {
      pagesArr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit;
    filterArr = filterArr.slice(si, ei);

    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul className="list-group favorites-genres">
                  {this.state.genres.map((genre) =>
                    this.state.currGenre === genre ? (
                      <li
                        className="list-group-item"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          backgroundColor: "#fa3b3b",
                        }}
                      >
                        {genre}
                      </li>
                    ) : (
                      <li
                        className="list-group-item"
                        style={{
                          fontWeight: "bold",
                        }}
                        onClick={() => this.handleGenreFilter(genre)}
                      >
                        {genre}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="col-lg-9 favorites-table col-sm-12">
                <div className="row">
                  <input
                    type="text"
                    placeholder="Search"
                    className="input-group-text col"
                    value={this.state.currText}
                    onChange={(e) =>
                      this.setState({ currText: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Rows/Page"
                    className="input-group-text col"
                    value={this.state.limit}
                    onChange={(e) => this.setState({ limit: e.target.value })}
                  />
                </div>
                <div className="row">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th
                          className="popularity"
                          scope="col"
                          onClick={this.sortPopularity}
                        >
                          Popularity <i className="fas fa-sort"></i>
                        </th>
                        <th
                          className="rating"
                          scope="col"
                          onClick={this.sortRating}
                        >
                          Rating <i className="fas fa-sort"></i>
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterArr.map((movieObj) => (
                        <tr>
                          <td
                            className="titles"
                            scope="row"
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{ width: "5.7rem" }}
                              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                              alt={
                                movieObj.original_title
                                  ? movieObj.original_title
                                  : movieObj.original_name
                              }
                              className="card-img-top movies-image"
                            />

                            {movieObj.original_title
                              ? movieObj.original_title
                              : movieObj.original_name}
                          </td>
                          <td>
                            {genreIds[`${movieObj.genre_ids[0]}`]
                              ? genreIds[`${movieObj.genre_ids[0]}`]
                              : "-"}
                          </td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => this.handleDelete(movieObj.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination-cont">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {pagesArr.map((page) =>
                        page === this.state.currPage ? (
                          <li className="page-item">
                            <a
                              className="page-link"
                              href="#"
                              onClick={() => this.handlePageChange(page)}
                              style={{
                                color: "white",
                                backgroundColor: "#fa3b3b",
                              }}
                            >
                              {page}
                            </a>
                          </li>
                        ) : (
                          <li className="page-item">
                            <a
                              className="page-link"
                              href="#"
                              onClick={() => this.handlePageChange(page)}
                            >
                              {page}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
