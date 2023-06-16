const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Habit = require("../models/habit");

module.exports.allHabits = async (req, res, next) => {
  try {
    const habit = await Habit.find({ user: req.user._id });
    return res.render("all_habits", { habits: habit, title: "All Habits" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    return res.redirect("back");
  }
};

module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/habit");
  }

  return res.render("login", { title: "Login Page" });
};

module.exports.register = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/");
  }
  return res.render("register", { title: "Register Page" });
};

module.exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      req.flash("error", "Email Already Exists");
      return res.redirect("/users/login");
    }

    await User.create(req.body);
    req.flash("success", "Registered Successfully");
    res.redirect("/users/login");
  } catch (error) {
    req.flash("error", "Try after sometimes");
    console.log(`Error in creating user : ${error}`);
    return res.redirect("back");
  }
};

module.exports.createSession = async (req, res) => {
  req.flash("success", "Welcome to the App");
  return res.redirect("/users/habit");
};

module.exports.destroySession = async (req, res, done) => {
  req.logout((err) => {
    if (err) return done(err);
  });

  req.flash("success", "Visit Again !");
  return res.redirect("/");
};

module.exports.forgetPassword = async (req, res) => {
  try {
    return res.render("forget_password", { title: "Reset Password" });
  } catch (error) {
    console.log(`Error in forget password ${error}`);
    return res.redirect("back");
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;

    if (password != confirm_password) {
      req.flash("error", "Confirm Password does't match");
      return res.redirect("back");
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid Email ID");
      return res.redirect("/users/register");
    }
    user.password = req.body.password;
    user.save();
    req.flash("success", "Password Change Successfully");
    return res.redirect("/users/login");
  } catch (error) {
    console.log(`Error in reset password ${error}`);
    return;
  }
};
