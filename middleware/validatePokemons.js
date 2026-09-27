const { param, body, validationResult } = require("express-validator");

const idRulesValidate = [param("id").isMongoId().withMessage("Not valid ID")];

const RulesValidatePokemons = [
  body("pokedexNumber")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Enter a valid Pokedex number")
    .toInt(),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Mandatory")
    .isString()
    .withMessage("Do not enter Special Characters"),

  body("type").isArray(),
  body("type.*").isString().trim(),

  body("hp").notEmpty().isInt({ min: 1 }).toInt(),
  body("attack").notEmpty().isInt({ min: 1 }).toInt(),
  body("defense").notEmpty().isInt({ min: 1 }).toInt(),
  body("specialAttack").notEmpty().isInt({ min: 1 }).toInt(),
  body("specialDefense").notEmpty().isInt({ min: 1 }).toInt(),
  body("speed").notEmpty().isInt({ min: 1 }).toInt(),

  body("abilities").isArray({ min: 1 }),
  body("abilities.*").isString().trim().notEmpty(),

  body("isLegendary").notEmpty().isBoolean().toBoolean(),
];

function ValidatePokemons(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  idMiddleware: [...idRulesValidate, ValidatePokemons],
  pokemonsMiddleware: [...RulesValidatePokemons, ValidatePokemons],
};
