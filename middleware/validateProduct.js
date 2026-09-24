const { param, body, validationResult } = require("express-validator");

const idRulesValidate = [param("id").isMongoId().withMessage("Not valid ID")];

const RulesValidateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Mandatory")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Do not enter Special Characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Mandatory")
    .isString()
    .withMessage("Do not enter Special Characters"),

  body("price")
    .trim()
    .notEmpty()
    .withMessage("Mandatory")
    .isFloat({ min: 0 })
    .withMessage("It needs to be a number,"),

  body("stock")
    .trim()
    .notEmpty()
    .withMessage("Mandatory")
    .isInt({ min: 0 })
    .withMessage("It needs to be a number,"),

  body("description").trim().notEmpty().withMessage("Mandatory"),

  body("inStock")
    .notEmpty()
    .withMessage("Mandatory")
    .isBoolean()
    .withMessage("It need to be a boolean (True or False)"),
];

function ValidateProduct(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  idMiddleware: [...idRulesValidate, ValidateProduct],
  productsMiddleware: [...RulesValidateProduct, ValidateProduct],
};
