module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error

    if (err.status === 400) {
      res
        .status(400)
        .json({
          errorMessage:
            "The server was unable to interpret the request due to an invalid syntax.",
        });
      return;
    }

    if (err.status === 401) {
      res
        .status(401)
        .json({ errorMessage: "Token does not exist or is not valid" });
      return;
    }

    if (err.status === 403) {
      res
        .status(403)
        .json({ errorMessage: "You don't have the right permission." });
      return;
    }

    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        errorMessage: "Internal server error",
      });
    }
  });
};
