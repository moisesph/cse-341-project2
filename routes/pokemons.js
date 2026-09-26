const express = require("express");
const router = express.Router();

const pokemonsController = require("../controllers/pokemons");
const {
  idMiddleware,
  pokemonsMiddleware,
} = require("../middleware/validatePokemons");

router.get("/", pokemonsController.getAll);

router.get("/:id", idMiddleware, pokemonsController.getSingle);

router.post("/", pokemonsMiddleware, pokemonsController.createPokemon);

router.put(
  "/:id",

  idMiddleware,
  pokemonsMiddleware,
  pokemonsController.updatePokemon,
);

router.delete("/:id", idMiddleware, pokemonsController.deletePokemon);

module.exports = router;
