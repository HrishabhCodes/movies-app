import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <div className="navBar">
          <Link to="/" style={{ textDecoration: "none", color: "#fa3b3b" }}>
            <h2 className="heading">Movies App</h2>
          </Link>
          <Link
            to="/favorites"
            style={{ textDecoration: "none", color: "#fa3b3b" }}
          >
            <h4 className="favorites">Favorites</h4>
          </Link>
        </div>
      </>
    );
  }
}
