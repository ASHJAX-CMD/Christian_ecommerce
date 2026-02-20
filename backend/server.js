require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./db/mysql')
const connectMongo = require('./db/mongodb');
const { testConnection } = require('./db/mysql');
const cookieParser = require("cookie-parser");
const path = require("path")
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // React app URL
  credentials: true,
}));
app.use(express.json());

// Connect databases
connectMongo();
testConnection();
sequelize.sync({ alter: true }) // updates table structure if needed
  .then(() => console.log("MySQL tables synced"))
  .catch(err => console.error("Sequelize sync error:", err));
// Sample routes

app.get('/', (req, res) => res.send('API running'));

// TODO: Import your routes here
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/user', require('./routes/user'));
app.use('/api/reviews',require('./routes/reviews'))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
