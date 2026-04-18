const { Server } = require("socket.io");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", (userId) => {
      socket.join(userId);
    });

    io.on("connection", (socket) => {
      socket.on("joinAdmin", () => {
        socket.join("admin");
        console.log("Admin joined room:", socket.id);
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

exports.getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized!");
  }
  return io;
};
