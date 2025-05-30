const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Razorpay = require("razorpay");

// Load routes
const userRoutes = require("./routes/userRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const mapsRoutes = require("./routes/mapsRoutes");
const payment = require("./routes/paymentRoutes");
const partnerDriverRoutes = require("./routes/partnerDriverRoutes");

// Driver
const driverRoutes = require("./routes/driverRoutes");

// Load DB connection
const connectDB = require("./config/database");

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "*", // Allow frontend access
    credentials: true,
  })
);

// API Routes
app.use("/api/Users", userRoutes);
app.use("/api/Partners", partnerRoutes);
app.use("/api/partner-drivers", partnerDriverRoutes);
app.use("/maps", mapsRoutes);

app.use("/drivers", driverRoutes);

// Payment
app.use("/api/v1", payment);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

module.exports = instance;
