/* eslint-disable no-undef */
const {checkMiddleWear} = require("../auth/validation_token");
const {createProduct, getProduct, getProductsUser, getProducts, updateProduct, deleteProduct} = require("./controlleurProduit");

const router = require("express").Router();

router.put("/product/", checkMiddleWear, updateProduct)
router.get("/products", getProducts)
router.get("/productsUser", getProductsUser)
router.get("/product/:id" ,checkMiddleWear, getProduct)
router.delete("/product/:id", checkMiddleWear, deleteProduct)
router.post("/product/create", checkMiddleWear, createProduct)
module.exports = router;
