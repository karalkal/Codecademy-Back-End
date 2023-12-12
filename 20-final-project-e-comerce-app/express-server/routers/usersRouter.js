const express = require('express');
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require('../controllers/Users');
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const usersRouter = express.Router({ mergeParams: true });

usersRouter.get("/", getAllUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.post("/", userAuthentication, adminAuthorization, createUser);
usersRouter.delete("/:userId", userAuthentication, adminAuthorization, deleteUser);
usersRouter.put("/:userId", userAuthentication, adminAuthorization, updateUser); // allow user to update themselves?, remove auth


module.exports = usersRouter