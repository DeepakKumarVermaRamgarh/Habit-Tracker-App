// import express
const express = require("express");
// Import the express-ejs-layouts module to use EJS layouts.
const expressEjsLayouts = require("express-ejs-layouts");
// Set the port number to 4000.
const port = 4000;
// Create a new Express application.
const app = express();
// Connect to the database.
const db = require("./config/mongoose");

// Import the flash module to use flash messages.
const flash = require("connect-flash");
// Import the flashMiddleware module to set flash messages.
const flashMiddleware = require("./config/flashMessage");
// Import the body-parser module to parse request bodies.
const bodyParser = require("body-parser");

// Import the passport module to provide authentication.
const passport = require("passport");
// Import the session module to store session data.
const session = require("express-session");
// Import the passport-local strategy module to provide local authentication.
const passportLocal = require("./config/passport-local-strategy");
// Import the Mongostore module to store session data in MongoDB.
const MongoStore = require("connect-mongo");
// Use the expressEjsLayouts middleware to use EJS layouts.
app.use(expressEjsLayouts);
// Use the bodyParser middleware to parse request bodies.
app.use(bodyParser.urlencoded({ extended: false }));
// Set the view engine to EJS.
app.set("view engine", "ejs");
// Set the views directory to `./views`.
app.set("views", "./views");
// Extract styles from EJS layouts.
app.set("layout extractStyles", true);
// Extract scripts from EJS layouts.
app.set("layout extractScripts", true);
// Use the express.static middleware to serve static assets from `./assets`.
app.use(express.static("./assets"));
// Create a new session store using MongoDB.
// Use the session middleware to store session data in MongoDB.
app.use(
  session({
    name: "habitTracker",
    secret: "4jr34f90ffdvberhtuih",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 100 },
    store: MongoStore.create(
      {
        mongoUrl:
          "mongodb+srv://DEEPAK-KUMAR-VERMA:aGbIEyodIyQdNydU@deepak-verma.ckk1ejs.mongodb.net/habitTracker",
        autoRemove: "disabled",
      },
      (err) => console.log("Error in mongo-store")
    ),
  })
);
// Initialize Passport.
app.use(passport.initialize());
// Use the passport middleware to provide authentication.
app.use(passport.session());
// Set the authenticated user on the request object.
app.use(passport.setAuthenticatedUser);

// Use the flash middleware to send flash messages.
app.use(flash());
// Use the flashMiddleware middleware to set flash messages.
app.use(flashMiddleware.setFlash);
// Use the routes middleware to route requests to the appropriate controller.
app.use("/", require("./routes"));
// Listen on port 4000.
app.listen(port, (err) => {
  // If there is an error, log it.
  if (err) return console.log(err);
  // Log a message indicating that the server is up and running.
  console.log(`Server is up and running on port : ${port}`);
});
