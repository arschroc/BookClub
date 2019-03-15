/**
 * Checks for errors in profile create/update
 * and returns an errors object
 * Errors include:
 *
 * handle invalid, handle field empty
 *
 * @summary Return errors from creating/editing profile
 * @author Aaron Schrock
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15 16:41:46
 */

const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  //set handle to empty string if empty
  data.handle = !isEmpty(data.handle) ? data.handle : "";

  //Handle length
  if (data.handle.length < 2 || data.handle.length > 30) {
    errors.handle = "Handle needs to be between 2 and 30 characters";
  }
  //Handle empty
  if (data.handle.length === 0) {
    errors.handle = "Profile handle is requried";
  }

  return errors;
};
