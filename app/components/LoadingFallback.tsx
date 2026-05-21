export default function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Esqueleto para título */}
        <div className="h-10 bg-gray-200 rounded w-3/4 max-w-md mb-8"></div>
        
        {/* Esqueleto para texto */}
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        
        {/* Esqueleto para cards/itens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 