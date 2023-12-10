const express = require('express');
const { getAllUsers, getUserById, createUser, deleteUser, updateUser } = require('../controllers/Users')

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const usersRouter = express.Router({ mergeParams: true });

usersRouter.get("/", getAllUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.post("/", createUser);
usersRouter.delete("/:userId", deleteUser);
usersRouter.put("/:userId", updateUser);


module.exports = usersRouter