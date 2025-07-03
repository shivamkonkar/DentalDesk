import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <header className="border-b border-slate-200 px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="h-6 w-24 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        {/* Page Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mb-2"></div>
            <div className="h-6 w-40 bg-slate-200 rounded animate-pulse"></div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="h-10 w-48 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Skeleton - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal & Contact Information Card Skeleton */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-6 w-56 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 6 skeleton items for contact info */}
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-1"></div>
                        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column Skeleton - 1/3 width */}
          <div className="space-y-6">
            {/* Medical History Card Skeleton */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Medical conditions skeleton */}
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>

                {/* Other conditions skeleton */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="h-4 w-48 bg-slate-200 rounded animate-pulse mb-2"></div>
                  <div className="bg-slate-100 border border-slate-200 rounded-lg p-3">
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact Card Skeleton */}
            <Card className="border-slate-200 shadow-none">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-6 w-36 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="h-4 w-24 bg-slate-200 rounded animate-pulse mb-1"></div>
                    <div className="h-5 w-32 bg-slate-200 rounded animate-pulse"></div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse mb-1"></div>
                      <div className="h-5 w-28 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
