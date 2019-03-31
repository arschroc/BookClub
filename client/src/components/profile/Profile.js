import React, { Component } from "react";
import { getProfileByHandle } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileLists from "./ProfileLists";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    const { currentUser } = this.props.location.state;
    let profileContent;

    if (profile == null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              {currentUser ? (
                <Link to="/dashboard" className="btn btn-light mb-3 float-left">
                  Back To Profile
                </Link>
              ) : (
                <Link to="/profiles" className="btn btn-light mb-3 float-left">
                  Back To Profiles
                </Link>
              )}
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileLists
            booksread={profile.booksread}
            bookstoread={profile.bookstoread}
          />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
