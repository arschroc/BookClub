/**
 * Check is object, string, value is null empty or undefined
 *
 * @summary Return true if object is empty
 * @author Aaron Schrock
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15 15:24:16
 */
function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

module.exports = isEmpty;
