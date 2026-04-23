const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">

      {/* ================= HEADER ================= */}
      <div className="h-20 bg-gray-200 w-full"></div>

      <div className="min-h-screen p-10 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">

          {/* ================= USER INFO ================= */}
          <div className="border-b pb-6 mb-6 space-y-3">
            <div className="h-8 w-40 bg-gray-300 rounded"></div>
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>

          {/* ================= ADDRESS SECTION ================= */}
          <div className="space-y-4">
            <div className="h-5 w-32 bg-gray-300 rounded"></div>

            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border p-4 rounded space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-36 bg-gray-200 rounded"></div>

                <div className="flex gap-3 mt-2">
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}

            {/* Add Address Button */}
            <div className="h-10 w-40 bg-gray-300 rounded mt-4"></div>
          </div>

          {/* ================= ORDERS ================= */}
          <div className="mt-8 space-y-4">
            <div className="h-6 w-40 bg-gray-300 rounded"></div>

            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border p-4 rounded space-y-2">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="h-4 w-36 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* ================= LOGOUT ================= */}
          <div className="mt-8">
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;