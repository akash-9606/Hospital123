// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const Razorpay = require("razorpay");

// dotenv.config(); // Load environment variables
// const app = express();

// // Load DB connection
// const connectDB = require("./config/database");

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json()); // Parse incoming JSON

// // CORS setup
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URI || "*", // Allow frontend access
//     credentials: true,
//   })
// );

// // Razorpay instance
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// // Make Razorpay available in routes
// app.set("razorpay", razorpayInstance);

// // ✅ Load new Hospital Partner routes
// const hospitalPartnerRoutes = require("./routes/hospitalPartnerRoutes"); // <-- ✅ NEW ROUTE IMPORT
// app.use("/api/partners-register", hospitalPartnerRoutes); // <-- ✅ REGISTERED EARLY

// // Load remaining routes
// const userRoutes = require("./routes/userRoutes");
// const partnerRoutes = require("./routes/partnerRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const partnerDriverRoutes = require("./routes/partnerDriverRoutes");
// const driverRoutes = require("./routes/driverRoutes");

// // Mount other routes
// app.use("/api/users", userRoutes);
// app.use("/api/partners", partnerRoutes);
// app.use("/api/partner-drivers", partnerDriverRoutes);
// app.use("/api/drivers", driverRoutes);
// app.use("/api/v1", paymentRoutes); // Razorpay routes

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚑 Server running on port ${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Razorpay = require("razorpay");

dotenv.config(); // ✅ Load environment variables

const app = express();

const connectDB = require("./config/database");
connectDB();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ CORS setup to allow frontend access
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "*", // Adjust this for security
    credentials: true,
  })
);

// ✅ Razorpay instance setup
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
app.set("razorpay", razorpayInstance);

// ✅ ROUTES SETUP

// ✅ Hospital Partner Registration Route
const hospitalPartnerRoutes = require("./routes/hospitalPartnerRoutes");
app.use("/api/partners-register", hospitalPartnerRoutes); // POST /api/partners-register/register

// 👥 User Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// 🏥 Ambulance Partner Routes
const partnerRoutes = require("./routes/partnerRoutes");
app.use("/api/partners", partnerRoutes);

// 🚑 Partner Driver Routes
const partnerDriverRoutes = require("./routes/partnerDriverRoutes");
app.use("/api/partner-drivers", partnerDriverRoutes);

// 🚕 General Driver Routes
const driverRoutes = require("./routes/driverRoutes");
app.use("/api/drivers", driverRoutes);

// 💳 Payment Routes (Razorpay)
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/v1", paymentRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚑 Server running on port ${PORT}`);
});
