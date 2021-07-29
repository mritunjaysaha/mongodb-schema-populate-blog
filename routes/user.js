const express = require("express");

const router = express.Router();

const {
    createUser,
    createTodo,
    getUser,
    getAllTodo,
} = require("../controllers/user");

/**
 * @route POST /api/create
 * @description create user
 */
router.post("/", createUser);

/**
 * @route POST /api/todo/:userId
 * @description add todo ObjectId to Users todo array
 */
router.post("/todo/:userId", createTodo);

/**
 * @route GET /api/:userId
 * @description get user details
 */
router.get("/:userId", getUser);

/**
 * @route GET /api/get-all/:userId
 * @description populate the todo schema
 */
router.get("/todo/:userId", getAllTodo);

module.exports = router;
