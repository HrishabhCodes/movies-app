import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
    };
  }
  render() {
    let movie = movies.results;
    return (
      <>
        {movie.length === 0 ? (
          <div className="loader-cont">
            <div
              className="spinner-border text-light text-center"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-center trending-header">
              <strong>Trending</strong>
            </h1>
            <div className="movies-cont">
              {movie.map((movieObj) => {
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
                          <a href="/" className="btn btn-dark movies-btn">
                            Add to Favorites
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
                    <a className="page-link" href="/" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="/" aria-label="Next">
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
