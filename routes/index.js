const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  {
    //#swagger.tags = ["Hello Word"]
    res.send("Hello World");
  }
});

router.use("/products", require("./products"));
router.use("/pokemons", require("./pokemons"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

(router.get("/github/callback", passport.authenticate("github"), {
  failureRedirect: "/api-docs",
  session: false,
}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/api-docs");
  });

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
