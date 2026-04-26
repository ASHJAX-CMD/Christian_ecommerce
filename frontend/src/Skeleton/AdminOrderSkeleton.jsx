const AdminOrdersSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* Header Skeleton */}
        <div className="flex items-center gap-3 mb-8 animate-pulse">
          <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
          <div>
            <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <th key={i} className="px-6 py-4">
                      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    {/* Order ID */}
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </td>

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-right">
                      <div className="h-4 w-16 bg-gray-200 rounded ml-auto animate-pulse"></div>
                    </td>

                    {/* Arrow */}
                    <td className="px-4 py-4">
                      <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersSkeleton;