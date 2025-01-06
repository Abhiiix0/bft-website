const express = require("express");
const paymentRoutes = require("./routes/payment");

const app = express();

// Add middleware for JSON parsing
app.use(express.json());

// Register your custom routes
app.use("/store", paymentRoutes);
