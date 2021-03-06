import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  GET_PROFILES,
  SET_CURRENT_USER
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Get All profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};

//Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

//Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Add book to read
export const addBookToRead = bookData => dispatch => {
  axios
    .post("/api/profile/bookstoread", bookData)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete book to read
export const deleteBookToRead = id => dispatch => {
  axios
    .delete(`/api/profile/bookstoread/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add book  read
export const addBookRead = bookData => dispatch => {
  axios
    .post("/api/profile/booksread", bookData)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete book  read
export const deleteBookRead = id => dispatch => {
  axios
    .delete(`/api/profile/booksread/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//read book action
export const readBook = (id, bookData) => dispatch => {
  axios
    .delete(`/api/profile/bookstoread/${id}`)
    .then(res => {
      axios
        .post("/api/profile/booksread", bookData)
        .then(res => {
          dispatch({
            type: GET_PROFILE,
            payload: res.data
          });
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Delete account and profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
