// This function sets the flash messages for the request.
module.exports.setFlash = (req, res, next) => {
  // Get the success and error flash messages from the request.
  const successMessage = req.flash("success");
  const errorMessage = req.flash("error");

  // Set the flash messages on the response object.
  res.locals.flash = {
    success: successMessage,
    error: errorMessage,
  };

  // Call the next middleware function.
  next();
};
