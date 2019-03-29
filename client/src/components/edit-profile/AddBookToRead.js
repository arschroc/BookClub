import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { API_BASE_URL, defaultOptions } from "../../utils/google-books-search";
var querystring = require("querystring");

class AddBookToRead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      books: [],
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
        this.setState({
          books: responseData.items
        });
        console.log(this.state.books);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("Submit");

    this.fetchData(this.state.search);

    /*
    search(this, this.state.search, {}, function(error, results) {
      if (!error) {
        console.log(results);
        console.log(this.state.search);
      } else {
        console.log(error);
      }
    });
    */
  }

  render() {
    const { errors } = this.state;
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
                  error={errors.search}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
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
