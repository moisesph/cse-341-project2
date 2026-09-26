const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['pokemons']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("pokemons")
      .find();
    res.setHeader("Content-Type", "application/json");

    const pokemons = await result.toArray();
    res.status(200).json(pokemons);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['pokemons']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const pokemonId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("pokemons")
      .find({ _id: pokemonId });
    res.setHeader("Content-Type", "application/json");

    const pokemons = await result.toArray();

    if (pokemons.length > 0) {
      res.status(200).json(pokemons[0]);
    } else {
      res.status(404).json({ message: "pokemon not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const createPokemon = async (req, res) => {
  //#swagger.tags=['pokemons']
  try {
    const pokemon = {
      pokedexNumber: req.body.pokedexNumber,
      name: req.body.name,
      type: req.body.type,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      specialAttack: req.body.specialAttack,
      specialDefense: req.body.specialDefense,
      speed: req.body.speed,
      abilities: req.body.abilities,
      isLegendary: req.body.isLegendary,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("pokemons")
      .insertOne(pokemon);
    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json({ message: "pokemon couldn't be created" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const updatePokemon = async (req, res) => {
  //#swagger.tags=['pokemons']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const pokemonId = new ObjectId(req.params.id);
    const pokemon = {
      pokedexNumber: req.body.pokedexNumber,
      name: req.body.name,
      type: req.body.type,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      specialAttack: req.body.specialAttack,
      specialDefense: req.body.specialDefense,
      speed: req.body.speed,
      abilities: req.body.abilities,
      isLegendary: req.body.isLegendary,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("pokemons")
      .replaceOne({ _id: pokemonId }, pokemon);
    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "pokemon not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const deletePokemon = async (req, res) => {
  //#swagger.tags=['pokemons']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "The ID provided is not valid" });
    }
    const pokemonId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("pokemons")
      .deleteOne({ _id: pokemonId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "pokemon not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
