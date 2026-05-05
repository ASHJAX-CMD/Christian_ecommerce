const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND,
       methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = socket.handshake.auth?.token;

      if (!token) {
        console.log("❌ No token provided");
        return socket.disconnect();
      }
      const user = jwt.verify(token, process.env.JWT_SECRET);

      // attach user
      socket.user = user;

      // join personal room
      socket.join(user.id);

      // join admin room
      if (user.role === "admin") {
        socket.join("admin");
        console.log("✅ Admin joined");
      }
    } catch (err) {
      console.log("❌ Unauthorized socket");
    }

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

exports.getIO = () => {
  if (!io) throw new Error("Socket not initialized!");
  return io;
};
