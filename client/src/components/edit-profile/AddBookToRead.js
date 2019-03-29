import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { API_BASE_URL, defaultOptions } from "../../utils/google-books-search";
import isMobileDevice from "../common/isMobileDevice";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";
var querystring = require("querystring");

class AddBookToRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      books: [],
      hasSearched: false,
      loading: false,
      bookAdded: -1,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  //Fetch 10 most relevant books from google books api
  fetchData(title) {
    // Create the request uri
    const options = defaultOptions;
    var query = {
      q: title,
      startIndex: options.offset,
      maxResults: options.limit,
      printType: options.type,
      orderBy: options.order,
      langRestrict: options.lang
    };

    //Make request
    var url = API_BASE_URL;
    url += "/volumes";
    url += "?" + querystring.stringify(query);

    //fetch
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        var res;

        if (!isEmpty(responseData.items)) {
          res = JSON.parse(JSON.stringify(responseData.items));
          this.setState({
            books: res,
            errors: null,
            loading: false
          });
        } else {
          this.setState({
            books: res,
            errors: { noSearchResults: "No Search Results Found" },
            loading: false
          });
        }
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onAddBookClick(index) {
    this.setState({
      bookAdded: index
    });
    //TODO call add book action
  }
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      hasSearched: true,
      bookAdded: -1,
      loading: true
    });

    //Fetch the book data for the
    this.fetchData(this.state.search);
  }

  render() {
    const { errors } = this.state;
    let bookSearchResults;

    //If no Search results
    if (!isEmpty(errors) || (this.state.hasSearched && !this.state.books)) {
      bookSearchResults = (
        <tr key="0">
          <td className="lead text-center">No Search Results Found</td>
        </tr>
      );
    }
    //Create search results to be displayed
    else if (this.state.loading) {
      bookSearchResults = null;
    } else if (this.state.bookAdded >= 0) {
      bookSearchResults = (
        <tr key="0">
          <td className="lead text-center">
            {this.state.books[this.state.bookAdded].volumeInfo.title} added to
            wishlist!
          </td>
        </tr>
      );
    } else {
      //Search results to be displayed
      bookSearchResults = this.state.books.map((book, index) => (
        <tr key={index}>
          <td>
            <a
              href={book.volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {book.volumeInfo.title}
            </a>
          </td>
          <td>{book.volumeInfo.authors[0]}</td>
          <td>
            <button
              onClick={this.onAddBookClick.bind(this, index)}
              className="btn btn-info"
            >
              Add Book
            </button>
          </td>
        </tr>
      ));
    }

    return (
      <div className="add-bookstoread">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light btn-info">
                Go Back
              </Link>
              <div className="display-4 text-center">Search for a book</div>
              <p className="lead text-center">
                Add a book to your reading wishlist
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Enter book name"
                  name="search"
                  value={this.state.search}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4 mb-4"
                />
              </form>
            </div>
          </div>
          <div>
            {this.state.hasSearched ? (
              <div className="search-results">
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
                    {bookSearchResults}
                  </thead>
                </table>
              </div>
            ) : null}
            {this.state.loading ? <Spinner /> : null}
          </div>
        </div>
      </div>
    );
  }
}

AddBookToRead.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(AddBookToRead);
