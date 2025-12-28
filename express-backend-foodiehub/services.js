const mongoose = require("mongoose");
const productSchema = require("./schema");
const orderSchema = require("./orderschema");
const userschema = require("./userschema");
const jwt = require("jsonwebtoken");

// Creating models (collections)
const ProductModel = mongoose.model("Product", productSchema);
const VegProductModel = mongoose.model("VegProduct", productSchema);
const NonvegProductModel = mongoose.model("NonvegProducts", productSchema, "nonvegproducts");
const OrdersModel = mongoose.model("Orders", orderSchema);
const UserModel = mongoose.model("Users", userschema);

// Products
const fetchAllProducts = () => ProductModel.find();
const fetchProductById = (id) => ProductModel.findOne({ id });
const addProduct = (newproduct) => new ProductModel(newproduct).save();
const addProducts = (newproducts) => ProductModel.insertMany(newproducts);
const deleteById = (id) => ProductModel.deleteOne({ id });
const addVegProduct = (items) => VegProductModel.insertMany(items);
const fetchVegProducts = () => VegProductModel.find();
const addNonvegProduct = (items) =>
  Array.isArray(items) ? NonvegProductModel.insertMany(items) : new NonvegProductModel(items).save();
const fetchNonvegProducts = () => NonvegProductModel.find();

// Orders
const createNewOrder = (orderDetails) => new OrdersModel(orderDetails).save();
const fetchAllOrders = () => OrdersModel.find();

// Users
const newRegistration = (userDetails) => new UserModel(userDetails).save();

// Login Service (optimized)
const loginService = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Email not found");
  if (user.password !== password) throw new Error("Incorrect password");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { message: "Login Successful", token, user };
};

module.exports = {
  fetchAllProducts,
  fetchProductById,
  addProduct,
  addProducts,
  deleteById,
  addVegProduct,
  fetchVegProducts,
  addNonvegProduct,
  fetchNonvegProducts,
  createNewOrder,
  fetchAllOrders,
  newRegistration,
  loginService,
  UserModel,
};
