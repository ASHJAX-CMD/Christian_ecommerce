import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOderDetails } from "../../slices/order";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-warning/15 text-warning border-warning/30",
  },
  processing: {
    label: "Processing",
    className: "bg-info/15 text-info border-info/30",
  },
  placed: {
    label: "Placed",
    className: "bg-info/15 text-info border-info/30",
  },
  shipped: {
    label: "Shipped",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  delivered: {
    label: "Delivered",
    className: "bg-success/15 text-success border-success/30",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order.orderDetails);
  console.log("params id:", id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOderDetails(id));
  }, [id]);

  // const orderItems = useSelector((state) => state.order.orderDetails);
  console.log("order details", order);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Order not found
          </h2>
          <p variant="outline" onClick={() => navigate("/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
          </p>
        </div>
      </div>
    );
  }

  const sc = statusConfig[order.status];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <p
          variant="ghost"
          onClick={() => navigate("/admin/orders")}
          className="mb-6 text-muted-foreground hover:text-foreground -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
        </p>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {order.id}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Placed on{" "}
              {new Date(order.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <p
            
            className={`${sc.className} bg-white  rounded-3xl text-sm px-4 py-1.5`}
          >
            {sc.label}
          </p>
        </div>

        <div className="grid gap-6  md:grid-cols-3">
          {/* Customer Info */}
          <div className="rounded-xl  border bg-card p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Customer
            </h3>
            <p className="font-semibold text-foreground mb-1">
              {order.User.name}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <p className="h-3.5 w-3.5" /> {order.User.email}
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Shipping
            </h3>
            <div className="flex items-start gap-2 text-sm text-foreground">
              <p className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
              {order.Address?.city}, {order.Address?.state} -{" "}
              {order.Address?.pincode}
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Payment
            </h3>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <p className="h-3.5 w-3.5 text-muted-foreground" />
              {order.paymentMethod},{order.paymentStatus}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mt-6 rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b bg-muted/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <p className="h-3.5 w-3.5" /> Items ({order.items.length})
            </h3>
          </div>
          <div className="divide-y">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">
                    <img
                      src={`http://localhost:5000/uploads/${
                        Array.isArray(item.productImage)
                          ? item.productImage[0]
                          : item.productImage
                      }`}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </span>

                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-sm text-foreground">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t bg-muted/30 flex justify-between items-center">
            <span className="font-semibold text-sm text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
