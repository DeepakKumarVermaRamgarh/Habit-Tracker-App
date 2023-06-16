// Import the Express module.
const express = require("express");

// Create a router.
const router = express.Router();

// Import the HabitController module.
const habitController = require("../controllers/habitController");

// Import the isAuthenticated middleware.
const isAuthenticated = require("../config/isAuthenticated");

// Define the routes.
router.get("/", isAuthenticated, habitController.getHabits);
router.post("/create-habit", isAuthenticated, habitController.createHabit);
router.get("/update/:id", isAuthenticated, habitController.markHabit);
router.get("/delete/:id", isAuthenticated, habitController.deleteHabit);

// Export the router.
module.exports = router;
