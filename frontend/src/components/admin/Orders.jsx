// import { Badge } from "@/components/ui/badge";
import { Outlet, useNavigate } from "react-router-dom";
import { Package, ChevronRight, Search, CaseUpper } from "lucide-react";
import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAdmin } from "../../slices/order";
import { Badge } from "./Badge";
import AdminOrdersSkeleton from "../../Skeleton/AdminOrderSkeleton";

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
const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAdmin());
  }, []);
  const {orders,loadingAdminOrders} = useSelector((state) => state.order);
  const navigate = useNavigate();

  
  const [search, setSearch] = useState("");

  const filtered = orders.filter(
    (o) =>
      o.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      o.userId.toLowerCase().includes(search.toLowerCase()),
  );
  if(loadingAdminOrders  && orders.length===0){return <AdminOrdersSkeleton/>}
  return (
    <div className="min-h-screen bg-background">
      {console.log("Data of Orders Placed", orders)}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Orders
              </h1>
              <p className="text-sm text-muted-foreground">
                {orders.length} total orders
              </p>
            </div>
          </div>
          {/* <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div> */}
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Order No.
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    User Id
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4 hidden sm:table-cell">
                    Last UpDated
                  </th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                   <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Payment Status
                  </th>
                  <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                    Total
                  </th>
                  <th className="px-4 py-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const sc = statusConfig[
                    order.status?.toLowerCase()?.trim()
                  ] || {
                    label: order.status || "Unknown",
                    className: "bg-muted text-muted-foreground border",
                  };
                  return (
                    <tr
                      
                      key={order.id}
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="border-b last:border-0 hover:bg-muted/40 cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4 font-semibold text-sm text-foreground">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-foreground">
                          {order.userId}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={sc.className}>
                          {sc.label}
                        </Badge>
                      </td>
                       <td className="px-6 py-4">
                        {order.payment_status.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground text-right">
                        {order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-4">
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </td>
                      
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-muted-foreground"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Orders;
