import { movies } from "./getmovies";
import React, { Component } from "react";

export default class Banner extends Component {
  render() {
    let movie = movies.results[0];

    return (
      <>
        {movie === "" ? (
          <div className="loader-cont">
            <div class="spinner-border text-light text-center" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="card banner-card">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="card-img-top banner-img"
            />
            <div className="card-body banner-body">
              <h4 className="card-title banner-title">
                {movie.original_title}
              </h4>
              <p className="card-text banner-text">{movie.overview}</p>
              {/* <a href="/" className="btn btn-primary">
                Go somewhere
              </a> */}
            </div>
          </div>
        )}
      </>
    );
  }
}
