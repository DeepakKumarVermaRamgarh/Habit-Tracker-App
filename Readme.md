# Habit Tracker App

This is a simple Habit Tracker App built with Express, Mongoose, and Passport.

## Getting Started

1. Install the dependencies:

Sure, here is a README file based on the previously given codes:

Code snippet

# Habit Tracker App

This is a simple Habit Tracker App built with Express, Mongoose, and Passport.

## Getting Started

1. Install the dependencies:

npm install bcryptjs body-parser connect-flash connect-mongo cookie-parser ejs express express-ejs-layouts express-session mongoose passport passport-local

2. Create a MongoDB database and connect to it using the `./config/mongoose.js` file.

3. Start the server:
   npm run dev
   The server will start on port 4000.

## Features

- Create and track habits.
- View your progress over time.

## File structure

habit-tracker
├── index.js
├── Readme.md
├── package.json
├── assets
│ ├── css
│ │ ├── forget_password.css
│ │ ├── header.css
│ │ ├── home.css
│ │ ├── login.css
│ │ ├── tasks.css
│ │ └── welcome.css
│ ├── js
│ │ └── home.js
│ └── images
│ ├── calendar.png
│ ├── background.jpg
│ ├── calender-watch.jpg
│ ├── key.png
│ ├── register.png
│ ├── reset_password.jpg
│ └── task.png
│  
├── config
│ ├── mongoose.js
│ ├── flashMessage.js
│ ├── isAuthenticated.js
│ └── passport-local-strategy.js
│  
├── controllers
│ ├── habitController.js
│ ├── userController.js
│ └── welcomeController.js
├── models
│ ├── Habit.js
│ └── User.js
├── routes
│ ├── index.js
│ ├── habit.js
│ └── users.js
└── views
├── \_header.ejs
├── all_habits.ejs
├── forget_password.ejs
├── habits.ejs
├── layout.ejs
├── login.ejs
├── register.ejs
└── welcome.ejs
