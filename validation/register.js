/**
 * Checks for errors in user registration and returns an errors object
 * Errors include:
 * Name size, Valid password, valid email, matching passwords,
 * Empty fields
 *
 * @summary Return errors from registering user
 * @author Aaron Schrock
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15 15:17:21
 */

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Set all data to empty strings if it is empty
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //Name should be between 2 and 30 characters
  if (data.name.length < 2 || data.name.length > 30) {
    errors.name = "Name should be between 2 and 30 characters";
  }

  //Check for valid email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Check for valid password
  if (data.password.length < 6 || data.password.length > 30) {
    errors.password = "Password must be at least 6 characters";
  }

  //Check for matching passwords
  if (data.password !== data.password2) {
    errors.password2 = "Passwords must match";
  }

  //Check if fields are empty
  if (data.name === "") {
    errors.name = "Name field is required";
  }
  if (data.password === "") {
    errors.password = "Password field is required";
  }
  if (data.password2 === "") {
    errors.password2 = "Confirm password field is required";
  }
  if (data.email === "") {
    errors.email = "Email field is required";
  }

  return errors;
};
