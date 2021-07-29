require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const user = require("./routes/user");

// initialize app
const app = express();

// import routes

// connect to database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));

// basic test route to check whether the server is active
app.get("/", (req, res) => res.send("Server is active"));

// api routes
app.use("/api", user);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
