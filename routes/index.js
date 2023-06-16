// Import the Express module.
const express = require("express");

// Import the WelcomeController module.
const welcomeController = require("../controllers/welcomeController");

// Create a router.
const router = express.Router();

// Define the routes.
router.get("/", welcomeController.home);
router.use("/users", require("./users"));

// Export the router.
module.exports = router;
