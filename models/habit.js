// import mongoose
const mongoose = require("mongoose");

// create a schema of habit

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  logs: [
    {
      date: {
        type: String,
      },
      status: {
        type: Boolean,
      },
    },
  ],
});

// create model of habit
const Habit = mongoose.model("Habit", habitSchema);

// export habit
module.exports = Habit;
