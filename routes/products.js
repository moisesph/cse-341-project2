const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/authenticate");

const productsController = require("../controllers/products");
const {
  idMiddleware,
  productsMiddleware,
} = require("../middleware/validateProduct");
router.get("/", productsController.getAll);
router.get("/:id", idMiddleware, productsController.getSingle);
router.post(
  "/",
  isAuthenticated,
  productsMiddleware,
  productsController.createProduct,
);
router.put(
  "/:id",
  isAuthenticated,
  idMiddleware,
  productsMiddleware,
  productsController.updateProduct,
);
router.delete(
  "/:id",
  isAuthenticated,
  idMiddleware,
  productsController.deleteProduct,
);

module.exports = router;
