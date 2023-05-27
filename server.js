const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;
const morgan = require("morgan");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(morgan("combined")); // for logging

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (_, res) => {
  res.send("API is running...");
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
