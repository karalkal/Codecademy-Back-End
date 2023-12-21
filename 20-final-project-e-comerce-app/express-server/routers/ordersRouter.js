const express = require('express');
const { getAllOrders, getOrderByOrderId, getOrdersByUserId, createOrder, deleteOrder, updateOrder } = require('../controllers/Orders');
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const ordersRouter = express.Router({ mergeParams: true });

ordersRouter.get("/", adminAuthorization, getAllOrders);    // only admins can see all orders
ordersRouter.get("/order/:orderId", adminAuthorization, getOrderByOrderId);    // only admin can view by orderId
ordersRouter.get("/user/:userId", userAuthentication, getOrdersByUserId);      // users can view their orders
ordersRouter.post("/", userAuthentication, adminAuthorization, createOrder);
ordersRouter.delete("/:orderId", userAuthentication, adminAuthorization, deleteOrder);
ordersRouter.put("/:orderId", userAuthentication, adminAuthorization, updateOrder);


module.exports = ordersRouter
