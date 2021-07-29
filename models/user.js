const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    todo: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
