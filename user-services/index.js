require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});