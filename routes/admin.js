const express = require("express");
const path = require("path");
const router = express.Router();
const adminController = require("../controllers/admin");
// const rootDir = require("../util/path");

//     /admin/add-product with GET
router.get("/add-product", adminController.getAddProduct);

//      /admin/products
router.get("/products", adminController.getProducts);
//    /admin/product with POST
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
