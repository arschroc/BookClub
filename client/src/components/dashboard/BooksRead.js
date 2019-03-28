import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteBookRead } from "../../actions/profileActions";
import isMobileDevice from "../common/isMobileDevice";

class BooksRead extends Component {
  onDeleteClick(id) {
    this.props.deleteBookRead(id);
  }
  render() {
    console.log(isMobileDevice());
    let booksRead;

    if (isMobileDevice()) {
      booksRead = this.props.booksread.map(book => (
        <tr key={book._id}>
          <td>{book.title}</td>
          <td>
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
      booksRead = this.props.booksread.map(book => (
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
        <h4 className="mb-h4">Books Read</h4>
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

            {booksRead}
          </thead>
        </table>
      </div>
    );
  }
}

BooksRead.propTypes = {
  deleteBookRead: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBookRead }
)(BooksRead);
