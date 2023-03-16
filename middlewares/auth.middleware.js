const { expressjwt } = require("express-jwt");

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    if (req.headers === undefined || req.headers.authorization === undefined) {
      // errorMessage: "User does not have a token."
      return null;
    }

    const tokenArr = req.headers.authorization.split(" ");
    const tokenType = tokenArr[0];
    const token = tokenArr[1];

    if (tokenType !== "Bearer") {
      //errorMessage: "Invalid token type"
      return null;
    }

    //successMessage: "The token exists and has the correct type"
    return token;
  },
});

module.exports = isAuthenticated;
