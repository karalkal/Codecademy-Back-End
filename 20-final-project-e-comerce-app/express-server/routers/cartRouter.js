const express = require('express');
const { getCartByUserId, createCart, deleteCart, updateCart } = require('../controllers/Cart');
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const cartRouter = express.Router({ mergeParams: true });

cartRouter.get("/:userId", userAuthentication, getCartByUserId);
cartRouter.post("/", userAuthentication, createCart);   // used to add items
cartRouter.delete("/", userAuthentication, deleteCart);
cartRouter.put("/:userId", userAuthentication, updateCart); // used to remove items


module.exports = cartRouter
