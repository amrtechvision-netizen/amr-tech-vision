import DashboardStats from "@/components/admin/DashboardStats";
import QuickActions from "@/components/admin/QuickActions";
import RecentProjects from "@/components/admin/RecentProjects";
import RecentMessages from "@/components/admin/RecentMessages";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <DashboardStats />

      <QuickActions />

      <RecentProjects />
      
      <RecentMessages />

    </div>
  );

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome to AMR TECH VISION Admin Panel
        </p>
      </div>

      {/* Statistics Cards */}
      <DashboardStats />

      {/* Recent Activity (Future) */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">
          Recent Activity
        </h2>

        <p className="text-gray-400">
          Recent projects, gallery uploads, and messages will appear here.
        </p>
      </div>

      {/* Quick Management (Future) */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">
          Quick Management
        </h2>

        <p className="text-gray-400">
          Quick action buttons will be added here in the next phase.
        </p>
      </div>

    </div>
  );
}