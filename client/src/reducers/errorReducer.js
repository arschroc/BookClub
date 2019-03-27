import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      console.log("Errors cleared");
      return {};
    case GET_ERRORS:
      console.log("Get errors");
      return action.payload;
    default:
      return state;
  }
}
