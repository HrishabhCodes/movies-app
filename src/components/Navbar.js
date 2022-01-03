import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <div className="navBar">
          <h2 className="heading">Movies App</h2>
          <h4 className="favorites">Favorites</h4>
        </div>
      </>
    );
  }
}
