import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBookToRead } from "../../actions/profileActions";
import isMobileDevice from "../common/isMobileDevice";

class BooksToRead extends Component {
  onDeleteClick(id) {
    this.props.deleteBookToRead(id);
  }
  onReadClick(id) {
    console.log(id);
  }
  render() {
    console.log(isMobileDevice());
    let booksToRead;

    if (isMobileDevice()) {
      booksToRead = this.props.bookstoread.map(book => (
        <tr key={book._id}>
          <td>{book.title}</td>
          <td>
            <button
              onClick={this.onReadClick.bind(this, book._id)}
              className="btn btn-info mr-2"
            >
              Read
            </button>
            <button
              onClick={this.onDeleteClick.bind(this, book._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      booksToRead = this.props.bookstoread.map(book => (
        <tr key={book._id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              {book.link}
            </a>
          </td>
          <td>
            <button
              onClick={this.onReadClick.bind(this, book._id)}
              className="btn btn-info mr-2"
            >
              Read
            </button>
            <button
              onClick={this.onDeleteClick.bind(this, book._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <h4 className="mb-h4">Book Wishlist</h4>
        <table className="table">
          <thead>
            {isMobileDevice() ? (
              <tr>
                <th>Title</th>
                <th />
              </tr>
            ) : (
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Link</th>
                <th />
              </tr>
            )}

            {booksToRead}
          </thead>
        </table>
      </div>
    );
  }
}

BooksToRead.propTypes = {
  deleteBookToRead: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBookToRead }
)(BooksToRead);
