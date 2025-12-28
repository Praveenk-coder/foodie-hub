const {
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
} = require("./services");

// Products Controllers
const getAllProducts = async (req, res) => {
  try {
    const products = await fetchAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await fetchProductById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    await addProduct(req.body);
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProducts = async (req, res) => {
  try {
    await addProducts(req.body);
    res.status(201).json({ message: "All products added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Veg products
const saveVegItem = async (req, res) => {
  try {
    await addVegProduct(req.body);
    res.status(201).json({ message: "Veg items saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVeg = async (req, res) => {
  try {
    const vegProducts = await fetchVegProducts();
    res.status(200).json(vegProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Non-veg products
const saveNonvegItem = async (req, res) => {
  try {
    await addNonvegProduct(req.body);
    res.status(201).json({ message: "Nonveg items saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNonveg = async (req, res) => {
  try {
    const nonvegProducts = await fetchNonvegProducts();
    res.status(200).json(nonvegProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product
const deleteProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteById(id);
    res.status(200).json({ message: `Product with id ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Orders
const createOrder = async (req, res) => {
  try {
    await createNewOrder(req.body);
    res.status(201).json({ message: "Order Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await fetchAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Users
const adduser = async (req, res) => {
  try {
    await newRegistration(req.body);
    
    res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login (plain password, no bcrypt)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Email and password are required" });
    }

    const { message, token, user } = await loginService(email, password);

    // Hide password
    const safeUser = { ...user._doc, password: undefined };

    return res.status(200).json({
      status: true,
      message,
      token,
      user: safeUser,
    });
  } catch (err) {
    return res.status(400).json({ status: false, message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  createProducts,
  saveVegItem,
  getVeg,
  saveNonvegItem,
  getNonveg,
  deleteProductById,
  createOrder,
  getOrders,
  adduser,
  loginUser,
};
