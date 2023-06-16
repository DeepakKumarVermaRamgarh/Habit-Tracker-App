// This middleware function checks if the user is authenticated.
// If the user is authenticated, then the next middleware function is called.
// Otherwise, the user is redirected to the login page.
module.exports = (req, res, next) => {
  // Check if the user is authenticated.
  if (req.isAuthenticated()) {
    // The user is authenticated, so call the next middleware function.
    return next();
  } else {
    // The user is not authenticated, so redirect them to the login page.
    res.redirect("/users/login");
  }
};
