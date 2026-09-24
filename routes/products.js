const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products");
const {
  idMiddleware,
  productsMiddleware,
} = require("../middleware/validateProduct");

router.get("/", productsController.getAll);

router.get("/:id", idMiddleware, productsController.getSingle);

router.post("/", productsMiddleware, productsController.createProduct);

router.put(
  "/:id",

  idMiddleware,
  productsMiddleware,
  productsController.updateProduct,
);

router.delete("/:id", idMiddleware, productsController.deleteProduct);

module.exports = router;
