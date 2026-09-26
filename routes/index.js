const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  {
    //#swagger.tags = ["Hello Word"]
    res.send("Hello World");
  }
});

router.use("/products", require("./products"));
router.use("/pokemons", require("./pokemons"));

module.exports = router;
