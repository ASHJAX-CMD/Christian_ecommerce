import React from "react";

const SkeletonCard = ({ span }) => {
  return (
    <div className={`${span}`}>
      <div className="rounded-xl bg-white p-6 shadow-sm animate-pulse">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Value */}
        <div className="mt-4 h-8 w-20 bg-gray-200 rounded"></div>

        {/* Footer (percentage / breakdown placeholder) */}
        <div className="mt-3 h-4 w-32 bg-gray-200 rounded"></div>

        {/* Optional breakdown lines */}
        <div className="flex justify-between mt-4">
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 flex justify-between">
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="mt-2 h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Live indicator skeleton */}
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Grid SAME as real */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <SkeletonCard span="col-span-12" />
          <SkeletonCard span="col-span-4" />
          <SkeletonCard span="col-span-8" />
          <SkeletonCard span="col-span-6" />
          <SkeletonCard span="col-span-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;