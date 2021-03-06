const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
  console.log(data)
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};