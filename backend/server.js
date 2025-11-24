require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();
connectDB();


app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/presets", require("./routes/presetRoutes"));


app.listen(process.env.PORT, () => {
console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
});