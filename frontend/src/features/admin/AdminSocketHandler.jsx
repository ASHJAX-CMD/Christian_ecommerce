import { useEffect } from "react";
import { socket } from "../../socket"; // adjust path
import { toast } from "react-hot-toast";

const AdminSocketHandler = ({ user }) => {
  useEffect(() => {
    // 🔌 connect
    socket.connect();

    // 🛠 join admin room
    socket.on("connect", () => {
       {console.log("user details ",user)}
      if (user?.role === "admin") {
    socket.emit("joinAdmin"); 
      console.log("✅ Admin joined");
    } else {
      console.log("❌ Non-admin tried to join admin room");
    }
    });
    // 🔔 listeners
    socket.off("newOrder").on("newOrder", (data) => {
      console.log("New Order:", data);
      toast.success(`${data.userName} placed order of ₹${data.total}`);
    });

    socket.off("lowStock").on("lowStock", (data) => {
      console.log("Low Stock:", data);
      toast.error(`${data.name} is low on stock ⚠️`);
    });

    // 🧹 cleanup
    return () => {
      socket.off("newOrder");
      socket.off("lowStock");
      socket.disconnect();
    };
  }, []);

  return null;
};

export default AdminSocketHandler;
