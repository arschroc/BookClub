import React, { Component } from "react";

class ProfileLists extends Component {
  render() {
    const { booksread, bookstoread } = this.props;

    const booksreadList = booksread.map(book => (
      <li key={book._id} className="list-group-item">
        <h6 className="text-center">{book.title}</h6>{" "}
        <a href={book.link} target="_blank" rel="noopener noreferrer">
          <img
            src={book.thumbnail}
            alt=""
            style={{
              width: "6em",
              height: "9em",
              margin: "auto",
              display: "block"
            }}
          />
        </a>
      </li>
    ));
    const bookstoreadList = bookstoread.map(book => (
      <li key={book._id} className="list-group-item">
        <h6 className="text-center">{book.title}</h6>{" "}
        <a href={book.link} target="_blank" rel="noopener noreferrer">
          <img
            src={book.thumbnail}
            alt=""
            style={{
              width: "6em",
              height: "9em",
              margin: "auto",
              display: "block"
            }}
          />
        </a>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Book Wishlist</h3>
          {bookstoreadList.length > 0 ? (
            <ul className="list-group">{bookstoreadList}</ul>
          ) : (
            <p className="text-center">No books listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Books read</h3>
          {booksreadList.length > 0 ? (
            <ul className="list-group">{booksreadList}</ul>
          ) : (
            <p className="text-center">No books listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileLists;
