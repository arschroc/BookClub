import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register user
export const registerUser = (userData, history) => dispatch => {
  console.log("User data: ");
  console.log(userData);
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Login User - Get user token
export const loginUser = userData => dispatch => {
  axios
    .post("api/users/login", userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log("Error message:");
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const logoutUser = () => dispatch => {
  //Remove the token from local storage
  localStorage.remove("jwtToken");
  //Remove the auth header for future requests
  setAuthToken(false);
  //Set teh current user to an empty object
  dispatch(setCurrentUser({}));
};
