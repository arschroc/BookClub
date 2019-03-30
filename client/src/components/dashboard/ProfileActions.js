import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-bio" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" />
        Edit Bio
      </Link>
      <Link to="/add-bookstoread" className="btn btn-light">
        <i className="fas fa-bookmark text-info mr-1" />
        Add Book to Wishlist
      </Link>
      <Link to="/add-booksread" className="btn btn-light">
        <i className="fas fa-book text-info mr-1" />
        Add Book Read
      </Link>
    </div>
  );
};

export default ProfileActions;
