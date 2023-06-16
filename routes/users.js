// Import the Express module.
const express = require("express");

// Import the UserController module.
const userController = require("../controllers/userController");

// Import the Passport module.
const passport = require("passport");

// Create a router.
const router = express.Router();

// Import the isAuthenticated middleware.
const isAuthenticated = require("../config/isAuthenticated");

// Define the routes.
router.get("/all-habits", isAuthenticated, userController.allHabits);

// Use the habit module to define routes for habits.
router.use("/habit", require("./habit"));

// Define the user routes.
router.get("/login", userController.login);
router.get("/register", userController.register);

// Create a new user.
router.post("/create", userController.create);

// Create a session for the current user.
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  userController.createSession
);

// Destroy the current session for the user.
router.get("/logout", userController.destroySession);

// Reset the password for the user.
router.get("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);

// Export the router.
module.exports = router;
