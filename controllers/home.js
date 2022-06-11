const HomeController = {
  Index: (req, res) => {
    res.render("home/index", {
      session: req.session.user,
      title: "GINSTAGRAM",
    });
  },
};

module.exports = HomeController;
