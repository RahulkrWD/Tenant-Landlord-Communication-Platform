const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
const authRouter = require("./routes/authRouter");
const landlordRouter = require("./routes/landlordRouter");
const scheduleDemo = require("./routes/scheduleDemo");

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

// Auth Router
app.use("/auth", authRouter);

// Landlord Router
app.use("/landlord", landlordRouter);

// schedule demo
app.use("/schedule-demo", scheduleDemo);

// Test Router
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "This is test route" });
});

// Undefined route
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
