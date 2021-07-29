const express = require("express");

const router = express.Router();

const User = require("../models/user");
const Todo = require("../models/todo");

/**
 * @route POST /api/create
 * @description create user
 */
router.post("/", (req, res) => {
    User.create(req.body)
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to create user", error: err.message })
        );
});

/**
 * @route POST /api/todo/:userId
 * @description add todo ObjectId to Users todo array
 */
router.post("/todo/:userId", (req, res) => {
    // extracting userId
    const { userId } = req.params;

    // creating new todo
    const newTodo = new Todo(req.body);
    console.log({ newTodo });
    // saving newTodo
    newTodo.save();

    User.findByIdAndUpdate(
        userId,
        { $push: { todo: newTodo._id } },
        { new: true, upsert: true },
        (err, user) => {
            if (err) {
                res.status(400).json({ message: "error" });
            }

            res.json(user);
        }
    );
});

/**
 * @route GET /api/:userId
 * @description get user details
 */
router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "User not found", error: err.message })
        );
});

/**
 * @route GET /api/get-all/:userId
 * @description populate the todo schema
 */
router.get("/todo/:userId", (req, res) => {
    // extracting userId
    const { userId } = req.params;

    User.findByIdAndUpdate(userId)
        .populate("todo")
        .exec((err, user) => {
            if (err) {
                res.status(400).json({
                    message: "Failed to populate",
                    error: err.message,
                });
            }

            res.json(user);
        });
});

module.exports = router;
