// Import the Mongoose module.
const mongoose = require("mongoose");

// The database URL.
const dbURL =
  "mongodb+srv://DEEPAK-KUMAR-VERMA:aGbIEyodIyQdNydU@deepak-verma.ckk1ejs.mongodb.net/habitTracker";

// Connect to the database.
mongoose.connect(dbURL);

// Get the database object.
const db = mongoose.connection;

// Set up an error handler.
db.on("error", console.error.bind(console, `Error in connecting to MongoDB`));

// Set up an open handler.
db.once("open", () => console.log(`Connected to database :: MongoDB`));

// Export the database object.
module.exports = db;
