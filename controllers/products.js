const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['products']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .find();
    res.setHeader("Content-Type", "application/json");

    const products = await result.toArray();
    res.status(200).json(products);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['products']
  try {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .find({ _id: productId });
    res.setHeader("Content-Type", "application/json");

    const products = await result.toArray();

    if (products.length > 0) {
      res.status(200).json(products[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  //#swagger.tags=['products']
  try {
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
      res.status(201).send();
    } else {
      res.status(500).json({ message: "Product couldn't be created" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  //#swagger.tags=['products']

  try {
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
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  //#swagger.tags=['products']
  try {
    const productId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .deleteOne({ _id: productId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct,
};
