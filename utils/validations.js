//REGEX
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

//Email
const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
};
// Password
const validatePassword = (password) => {
  if (!passwordRegex.test(password)) {
    return false;
  } else {
    return true;
  }
};

module.exports = { validatePassword, validateEmail };
