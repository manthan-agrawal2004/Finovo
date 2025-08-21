import DashboardPage from "./page";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="w-full flex flex-col items-center mt-16 space-y-4">
            {/* Animated Gradient Loader */}
            <div className="w-3/4 h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
              <div className="h-full w-full animate-progress bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
            </div>

            {/* Text */}
            <p className="text-sm text-muted-foreground animate-pulse">
              Loading dashboard...
            </p>
          </div>
        }
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}