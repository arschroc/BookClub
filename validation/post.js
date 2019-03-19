/**
 * Checks for errors in create post form
 * Errors include:
 *
 * emtpy text field, Post not correct elngth
 *
 * @summary Return errors from creating post
 * @author Aaron Schrock
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-19 13:26:47
 */
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  //Set data to emtpy string if it is empty
  data.text = !isEmpty(data) ? data.text : "";

  //Check length of text
  if (data.text.length < 10 || data.text.length > 300) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (data.text.length === 0) {
    errors.text = "Text field is required";
  }

  return errors;
};
