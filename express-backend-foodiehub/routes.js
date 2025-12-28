const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  createProducts,
  deleteProductById,
  saveVegItem,
  saveNonvegItem,
  getVeg,
  getNonveg,
  createOrder,
  getOrders,
  adduser,
  loginUser
} = require("./productController");

const authenticate = require("./authorization");

const router = express.Router();

//registration
router.post("/register",adduser)

//login 
router.post("/login",loginUser)



router.use(authenticate)

// Basic products
router.get("/getall", getAllProducts);
router.get("/getbyid/:id", getProductById);
router.post("/save", createProduct);
router.post("/saveall", createProducts);
router.delete("/deletebyid/:id", deleteProductById);

// Veg & Nonveg
router.post("/saveveg", saveVegItem); 
router.post("/savenonveg", saveNonvegItem);
router.get("/getveg", getVeg);
router.get("/getnonveg", getNonveg);

// orders route
router.post("/orders",createOrder)
router.get("/getorders", getOrders)



module.exports = router;
