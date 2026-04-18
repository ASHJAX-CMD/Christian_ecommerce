require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./db/mysql')
const connectMongo = require('./db/mongodb');
const { testConnection } = require('./db/mysql');
const User = require("./models/mysql/User")
const cookieParser = require("cookie-parser");
const path = require("path")
const app = express();
const bcrypt = require("bcrypt");
const { webhookHandler } = require('./controllers/webhook');
const http = require("http");
const { initSocket } = require("./config/socket"); // we'll create this next

const server = http.createServer(app);


app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // React app URL
  credentials: true,
}));
// app.use((req, res, next) => {
//   if (req.originalUrl.startsWith("/api/payment/webhook")) return next();
//   express.json()(req, res, next);
// });

app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);
app.use(express.json())

// Connect databases
connectMongo();
testConnection();
sequelize.sync({ force: true }).then(async () => {
  console.log("DB reset successfully!");
const hashedPassword = await bcrypt.hash("123456", 10);

  // ✅ Seed a default user
  await User.create({
    id: 1, // make sure this matches your test JWT
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,
    role:"admin" // hashed password if using bcrypt
  });

  console.log("Default user seeded");
});
// Sample routes


app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('API running'));

// TODO: Import your routes here
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/address', require('./routes/address'));
app.use('/api/user', require('./routes/user'));
app.use('/api/payment', require('./routes/payement'));
// app.use('/api/user', require('./routes/orders'));
app.use('/api/reviews',require('./routes/reviews'))

// initialize socket
initSocket(server);
app.get("/test-socket", (req, res) => {
  const io = initSocket();

  io.to("admin").emit("newOrder", {
    message: "🔥 Test order from backend",
    time: new Date(),
  });

  res.send("Socket event sent!");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
