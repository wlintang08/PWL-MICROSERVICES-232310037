require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use(express.json());

// USER SERVICE
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
  })
);

// BOOK SERVICE
app.use(
  "/api/books",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});