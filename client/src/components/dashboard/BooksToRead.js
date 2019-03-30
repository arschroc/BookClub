import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteBookToRead,
  addBookRead,
  readBook
} from "../../actions/profileActions";
import isMobileDevice from "../common/isMobileDevice";

class BooksToRead extends Component {
  onDeleteClick(id) {
    this.props.deleteBookToRead(id);
  }
  onReadClick(id) {
    //var book = this.

    const books = this.props.profile.profile.bookstoread.filter(
      book => book._id === id
    );

    const book = {
      author: books[0].author,
      link: books[0].link,
      thumbnail: books[0].thumbnail,
      title: books[0].title
    };

    this.props.readBook(id, book);
  }
  render() {
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
          <td>
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              {book.title}
            </a>
          </td>
          <td>{book.author}</td>

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
  deleteBookToRead: PropTypes.func.isRequired,
  addBookRead: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  readBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteBookToRead, addBookRead, readBook }
)(BooksToRead);
