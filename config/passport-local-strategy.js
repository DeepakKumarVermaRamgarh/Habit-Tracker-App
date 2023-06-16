// Import the Passport module.
const passport = require("passport");

// Import the LocalStrategy module.
const LocalStrategy = require("passport-local").Strategy;

// Import the User model.
const User = require("../models/user");

// Configure the LocalStrategy.
passport.use(
  new LocalStrategy(
    {
      // The username field is "email".
      usernameField: "email",
      // The request object is passed to the callback function.
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // Find a user with the given email address.
      const user = await User.findOne({ email });

      // If no user is found, return an error.
      if (!user) {
        req.flash("error", "Invalid Username Or Password");
        return done(null, false);
      }

      // Compare the password with the user's password.
      const isPasswordMatched = await user.comparePassword(password);

      // If the passwords do not match, return an error.
      if (!isPasswordMatched) {
        req.flash("error", "Invalid Username Or Password");
        return done(null, false);
      }

      // Successfully authenticated the user.
      return done(null, user);
    }
  )
);

// Serialize the user object to its ID.
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize the user ID to a user object.
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user with the given ID.
    const user = await User.findById(id).select("-password").exec();

    // If no user is found, return an error.
    if (!user) {
      req.flash("error", "User not found");
      return done(null, false);
    }

    // Successfully deserialized the user.
    return done(null, user);
  } catch (err) {
    console.log("Error in finding user --> Passport");
    return done(err);
  }
});

// Check if the user is authenticated.
passport.checkAuthentication = (req, res, next) => {
  // If the user is authenticated, call the next middleware function.
  if (req.isAuthenticated()) return next();

  // Otherwise, redirect the user to the login page.
  return res.redirect("/users/login");
};

// Set the authenticated user on the request object.
passport.setAuthenticatedUser = (req, res, next) => {
  // If the user is authenticated, set the user object on the request object.
  if (req.isAuthenticated()) res.locals.user = req.user;
  next();
};

// Export the passport object.
module.exports = passport;
