const express = require("express");
const connectDB = require("./db/mongo");
const apiRoutes = require("./routes/index.route");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // FE domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Connect Mongo
connectDB();

app.use(express.json());

//api
app.use("/api", apiRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));