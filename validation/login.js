/**
 * Checks for errors in user registration and returns an errors
 * object
 * Errors include:
 *
 * Email invalid, email or password fields empty
 *
 * @summary Return errors from registering user
 * @author Aaron Schrock
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15 15:28:47
 */
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (data.email === "") {
    errors.email = "Email field is empty";
  }
  if (data.password === "") {
    errors.password = "Password field is empty";
  }

  return errors;
};
