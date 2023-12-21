const express = require('express');
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require('../controllers/Users');
const userAuthentication = require('../middleware/userAuthentication');
const adminAuthorization = require('../middleware/adminAuthorization');

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const usersRouter = express.Router({ mergeParams: true });

usersRouter.get("/", userAuthentication, getAllUsers);              // only authorised users can see profiles
usersRouter.get("/:userId", userAuthentication, getUserById);       // users restricted to own profiles only, admins allowed too
usersRouter.post("/", userAuthentication, adminAuthorization, createUser);
usersRouter.delete("/:userId", userAuthentication, adminAuthorization, deleteUser);
usersRouter.put("/:userId", userAuthentication, adminAuthorization, updateUser); // allow user to update themselves?, remove auth


module.exports = usersRouter
