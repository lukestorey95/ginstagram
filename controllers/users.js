const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { session: req.session.user });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/sessions/new");
    });
  },
};

module.exports = UsersController;
