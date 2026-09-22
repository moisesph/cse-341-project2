const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['products']
  const result = await mongodb.getDatabase().db().collection("products").find();
  result.toArray().then((products) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(products);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['products']
  const productId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("products")
    .find({ _id: productId });
  result.toArray().then((products) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(products[0]);
  });
};

const createProduct = async (req, res) => {
  //#swagger.tags=['products']
  const product = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    inStock: req.body.inStock,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("products")
    .insertOne(product);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the product.",
      );
  }
};

const updateProduct = async (req, res) => {
  //#swagger.tags=['products']
  const productId = new ObjectId(req.params.id);
  const product = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    inStock: req.body.inStock,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("products")
    .replaceOne({ _id: productId }, product);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the product.",
      );
  }
}; 

const deleteProduct = async (req, res) => {
  //#swagger.tags=['products']
  const productId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("products")
    .deleteOne({ _id: productId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the product.",
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct,
};
