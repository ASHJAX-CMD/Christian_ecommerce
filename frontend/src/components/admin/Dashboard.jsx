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




const StatCard = ({
  title,
  value,
  
  icon: Icon,
  color,

  pending,
  placed,
  completed
}) => (
  <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className={` ${color} rounded-lg p-2`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-3xl font-bold tracking-tight text-foreground">
        {value}
      </h3>
     
     
      {title==="Total Orders"? <div  className="flex justify-between border-t" >
        <div><p>Completed</p> <p>{completed}</p></div>
        <div><p>Pending</p> <p>{pending}</p></div>
        <div><p>Placed</p> <p>{placed}</p></div>
      </div>:""}
    </div>
  </div>
);

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchOrderStats())
    },[])
        const { orderStats, totalProducts, lowStock } = useSelector(
  (state) => state.order
);

const statusCounts = orderStats?.reduce((acc, item) => {
  acc[item.status] = Number(item.count);
  return acc;
}, {}) || {};
const totalOrders = orderStats?.reduce(
  (sum, item) => sum + Number(item.count),
  0
) || 0;

const completed = statusCounts.delivered || 0;
const pending = statusCounts.pending || 0;
const placed = statusCounts.placed || 0;
const cancelled = statusCounts.cancelled || 0;

const stats = [
  {
    title: "Total Orders",
    value: totalOrders,
    positive: true,
    icon: ShoppingCart,
    color: "text-blue-600",
    bg: "bg-blue-50",
    span: "col-span-12",
    pending,
    placed,
    completed,
  },
  {
    title: "Products Live",
    value: totalProducts,
    positive: true,
    icon: Package,
    color: "text-violet-600",
    bg: "bg-violet-50",
    span: "col-span-6",
  },
  {
    title: "Low Stock Products",
    value: lowStock,
    positive: false,
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    span: "col-span-6",
  },
  {
    title: "Canceled Orders",
    value: cancelled,
    positive: false,
    icon: XCircle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    span: "col-span-6",
  },
];
 console.log(orderStats)
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your store performance
          </p>
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
