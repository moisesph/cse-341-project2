const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");

const pokemonsController = require("../controllers/pokemons");
const {
  idMiddleware,
  pokemonsMiddleware,
} = require("../middleware/validatePokemons");
router.get("/", pokemonsController.getAll);
router.get("/:id", idMiddleware, pokemonsController.getSingle);
router.post(
  "/",
  isAuthenticated,
  pokemonsMiddleware,
  pokemonsController.createPokemon,
);
router.put(
  "/:id",
  isAuthenticated,
  idMiddleware,
  pokemonsMiddleware,
  pokemonsController.updatePokemon,
);
router.delete(
  "/:id",
  isAuthenticated,
  idMiddleware,
  pokemonsController.deletePokemon,
);

module.exports = router;
