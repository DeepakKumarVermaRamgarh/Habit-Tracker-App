// Import the User and Habit models.
const User = require("../models/user");
const Habit = require("../models/habit");

// Create a new habit.
module.exports.createHabit = async (req, res) => {
  try {
    // Get the title and description from the request body.
    const { title, description } = req.body;

    // Check if a habit with the same title already exists for the current user.
    const habit = await Habit.findOne({ title, user: req.user._id });

    if (habit) {
      // Flash an error message and redirect back to the previous page.
      req.flash("error", "Habit Already Exists");
      return res.redirect("back");
    }

    // Get the current date.
    const today = new Date().toDateString();

    // Create a new habit and set its properties.
    const newHabit = await Habit.create({
      title,
      description,
      user: req.user._id,
      logs: [
        {
          date: today,
          status: null,
        },
      ],
    });

    // Flash a success message and redirect back to the previous page.
    req.flash("success", "Habit Created Successfully");
    return res.redirect("back");
  } catch (error) {
    // Log the error and redirect back to the previous page.
    console.log(`Error in habit creation : ${error}`);
    return res.redirect("back");
  }
};

// Get all habits for the current user.
module.exports.getHabits = async (req, res) => {
  try {
    // Find all habits for the current user.
    const habits = await Habit.find({ user: req.user._id });

    // Render the habits template with the habits data.
    return res.render("habits", { habits, title: "Habits" });
  } catch (err) {
    // Return a 400 error if there is an error.
    res.status(400).json({ error: err.message });
  }
};

// Mark a habit as completed or aborted.
module.exports.markHabit = async (req, res) => {
  try {
    // Get the habit ID from the request parameters.
    const id = req.params.id;

    // Find the habit with the given ID.
    const habit = await Habit.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!habit) {
      // Flash an error message and redirect back to the previous page.
      req.flash("error", "Habit not found");
      return res.redirect("back");
    }

    // Get the current date.
    const currentDate = new Date().toDateString();

    // Find the log for the current date.
    const log = habit.logs.find((log) => log.date === currentDate);

    // Set the status of the log to the opposite of its current value.
    let done = true;
    if (log) {
      log.status = !log.status;
      done = log.status;
    } else {
      habit.logs.push({ date: currentDate, status: true });
    }

    // Save the habit.
    await habit.save();

    // Flash a success message and redirect back to the previous page.
    done
      ? req.flash("success", "Habit completed Successfully.")
      : req.flash("success", "Habit Aborted Successfully.");
    return res.redirect("back");
  } catch (error) {
    // Log the error.
    console.log(error);
    return;
  }
};
// Delete a habit.
module.exports.deleteHabit = async (req, res) => {
  try {
    // Get the habit ID from the request parameters and userid from request object
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    // if habit not found redirect to back
    if (!habit) {
      req.flash("error", "Habit not found");
      return res.redirect("back");
    }
    // habit found and deleted successfully
    req.flash("success", "Habit deleted successfully");
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return;
  }
};
