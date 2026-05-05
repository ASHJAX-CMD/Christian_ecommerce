import {
  ShoppingCart,
  DollarSign,
  Package,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderStats } from "../../slices/order";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsGraphDownArrow } from "react-icons/bs";
import { motion } from "framer-motion";
import DashboardSkeleton from "../../Skeleton/DashBoardSkeleton";

const LiveRipple = () => {
  return (
   
    <div className="flex items-center gap-2">
      {/* Dot container */}
      <div className="relative flex items-center justify-center h-4 w-4">
        {/* Ripple */}
        <motion.span
          className="absolute h-4 w-4 rounded-full bg-green-400"
          animate={{ scale: [1, 2], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />

        {/* Center dot */}
        <span className="h-2 w-2 rounded-full bg-green-600"></span>
      </div>

      <span className="text-xs text-green-600 font-medium">Live</span>
    </div>
  );
};
const StatCard = ({
  title,
  value,
  valueLastMonth = 0,

  icon: Icon,
  color,

  pending = 0,
  placed = 0,
  completed = 0,
}) => {
  const diff = value - valueLastMonth;

  const percent =
    valueLastMonth === 0
      ? value > 0
        ? 100 // new growth
        : 0
      : (diff / valueLastMonth) * 100;

  const isPositive = diff >= 0;
  const TrendIcon = isPositive ? BsGraphUpArrow : BsGraphDownArrow;
  return (
    <div className="rounded-xl   bg-card p-6 bg-white shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className={`${color} rounded-lg p-2`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-bold">{value}</h3>

        {/* 🔥 Percentage Footer */}
        <p
          className={`text-sm mt-1 ${
            title === "Canceled Orders"
              ? isPositive
                ? "text-red-600" // more cancelled = bad
                : "text-green-600" // less cancelled = good
              : isPositive
                ? "text-green-600"
                : "text-red-600"
          }`}
        >
          {title !== "Products Live" && title !== "Low Stock Products" &&  title !== "Canceled Orders"&& (
            <TrendIcon />
          )}
          {title !== "Products Live" && title !== "Low Stock Products" &&  title !== "Canceled Orders"&& (
            <>{Math.abs(percent).toFixed(1)}% from last month</>
          )}
        </p>

        {/* Breakdown */}
        {title === "Total Orders" && (
          <div className="flex justify-between border-t mt-3 pt-2 text-sm">
            <div>
              Completed <p>{completed}</p>
            </div>
            <div>
              Pending <p>{pending}</p>
            </div>
            <div>
              Placed <p>{placed}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderStats());
  }, []);
  const { orderStats,loadingOrderStats } = useSelector((state) => state.order);

  // const statusCounts =
  //   orderStats?.reduce((acc, item) => {
  //     acc[item.status] = Number(item.count);
  //     return acc;
  //   }, {}) || {};
  // const totalOrders =
  //   orderStats?.reduce((sum, item) => sum + Number(item.count), 0) || 0;

  // const completed = statusCounts.delivered || 0;
  // const pending = statusCounts.pending || 0;
  // const placed = statusCounts.placed || 0;
  // const cancelled = statusCounts.cancelled || 0;

  const stats = [
    {
      title: "Total Orders",
      value: orderStats.thisMonth?.total_orders || 0,
      valueLastMonth: orderStats.prevMonthOrderStats?.totalOrders || 0,
      positive: true,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
      span: "col-span-12",
      pending: orderStats.thisMonth?.pending_orders,
      placed: orderStats.thisMonth?.placed_orders,
      completed: orderStats.thisMonth?.completed_orders,
      pendingLastMonth: orderStats.prevMonth_orderStats?.pending_orders,
      placedLastMonth: orderStats.prevMonth_orderStats?.placed_orders,
      completedLastMonth: orderStats.prevMonth_orderStats?.completed_orders,
    },
    {
      title: "Total Revenue (This Month)",
      value: orderStats.thisMonth?.revenue || 0,
      positive: true,
      icon: Package,
      color: "text-violet-600",
      bg: "bg-violet-50",
      span: "col-span-4",
    },
    {
      title: "Products Live",
      value: orderStats.totalProducts || 0,
      positive: true,
      icon: Package,
      color: "text-violet-600",
      bg: "bg-violet-50",
      span: "col-span-8",
    },
    {
      title: "Low Stock Products",
      value: orderStats.lowStock,
      positive: false,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      span: "col-span-6",
    },
    {
      title: "Canceled Orders",
      value: orderStats.thisMonth?.cancelledOrders || 0,
      valueLastMonth: orderStats.prevMonthOrderStats?.cancelledOrders || 0,
      positive: false,
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      span: "col-span-6",
    },
  ];
if(loadingOrderStats && Object.keys(orderStats).length===0){return <DashboardSkeleton/>}
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      {console.log(orderStats.length)}
      {console.log("Total Data for DashBoard", orderStats)}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between">
          <div>
            {" "}
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your store performance
            </p>
          </div>
          <LiveRipple />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.title} className={stat.span}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
