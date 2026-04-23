// AdminLayout.jsx
import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "../../socket"; // your socket instance
import {useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
  useEffect(() => {
    socket.on("newOrder", (data) => {
      toast.info(
        <div
           onClick={() => navigate(`/admin/orders/${data.orderId}`)}
         
        className="cursor-pointer"
        >
              {console.log("Data for Toast",data)}
          <p className="font-semibold">🆕 New Order</p>
          <p>{data.userName}</p>
          <p>₹{data.total}</p>
        </div>,
      );
    });

    // ✅ cleanup (VERY IMPORTANT)
    return () => {
      socket.off("newOrder");
    };
  }, []);

  return <>
 
  {children}</>;
};

export default AdminLayout;
