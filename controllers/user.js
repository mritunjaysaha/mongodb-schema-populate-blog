const User = require("../models/user");
const Todo = require("../models/todo");

exports.createUser = (req, res) => {
    User.create(req.body)
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to create user", error: err.message })
        );
};

exports.createTodo = (req, res) => {
    // extracting userId
    const { userId } = req.params;

    // creating new todo
    const newTodo = new Todo(req.body);
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
};

exports.getUser = (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then((data) => res.json(data))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "User not found", error: err.message })
        );
};

exports.getAllTodo = (req, res) => {
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
};
