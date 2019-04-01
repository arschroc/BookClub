import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md5 col-8">
            <h3>{profile.user.name}</h3>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4 className="text-center">Latest Book Read</h4>
            {console.log(profile.booksread[0])}
            {profile.booksread.length !== 0 ? (
              <div className="booksread">
                <h6 className="text-center">{profile.booksread[0].title}</h6>{" "}
                <a
                  href={profile.booksread[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={profile.booksread[0].thumbnail}
                    alt=""
                    style={{
                      width: "6em",
                      height: "9em",
                      margin: "auto",
                      display: "block"
                    }}
                  />
                </a>
              </div>
            ) : (
              <div className="booksread">
                <h6>No books read</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
