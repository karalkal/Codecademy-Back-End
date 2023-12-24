const express = require('express');
const { getAllOrders, getOrderByOrderId, getOrdersByUserId, createOrder, deleteOrder, updateOrder } = require('../controllers/Orders');
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const ordersRouter = express.Router({ mergeParams: true });

// only admins can see all orders
ordersRouter.get("/", adminAuthorization, getAllOrders);
// url/order/order/id only admin can view by orderId
ordersRouter.get("/order/:orderId", adminAuthorization, getOrderByOrderId);
// url/order/user/id users can view their orders, admins too  
ordersRouter.get("/user/:userId", userAuthentication, getOrdersByUserId);
// this is the route where an order is placed
ordersRouter.post("/", userAuthentication, createOrder);
// admins only can remove orders
ordersRouter.delete("/:orderId", adminAuthorization, deleteOrder);
// admin changes status to shipped, completed etc.
ordersRouter.put("/:orderId", adminAuthorization, updateOrder);


module.exports = ordersRouter
