
const ProjectsSkeletonLoader = () => {
  return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse space-y-4 border rounded-lg p-4 bg-white"
          >
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
  )
}

export default ProjectsSkeletonLoader