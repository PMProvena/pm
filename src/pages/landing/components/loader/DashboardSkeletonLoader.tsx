
const DashboardSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto space-y-6">
          {/* Stats Cards Skeleton */}
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse h-28 bg-white rounded-lg p-4 space-y-3"
              >
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-6 w-1/2 bg-gray-300 rounded" />
                <div className="h-3 w-1/4 bg-gray-300 rounded" />
              </div>
            ))}
          </div>

          {/* Current Project Skeleton */}
          <div className="animate-pulse bg-white rounded-lg p-4 space-y-4">
            <div className="h-6 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="flex space-x-4">
              <div className="h-8 w-1/3 bg-gray-300 rounded" />
              <div className="h-8 w-1/3 bg-gray-300 rounded" />
            </div>
            <div className="h-2 w-full bg-gray-300 rounded" />
          </div>

          {/* Recent Activity / Notifications Skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-white rounded-lg p-4 space-y-3"
              >
                <div className="h-5 w-1/3 bg-gray-300 rounded" />
                {Array.from({ length: 3 }).map((__, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-gray-300 rounded-full" />
                    <div className="h-3 w-3/4 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default DashboardSkeletonLoader