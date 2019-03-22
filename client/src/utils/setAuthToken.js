import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //Apply token to every request if there is a token
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete the auth token when you log out
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
