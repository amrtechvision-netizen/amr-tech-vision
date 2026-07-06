import AdminUsersList from "@/components/admin/AdminUsersList";
import CreateAdminForm from "@/components/admin/CreateAdminForm";

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Admin Users
        </h1>

        <p className="text-gray-400 mt-2">
          Manage administrator accounts.
        </p>
      </div>

      <CreateAdminForm />

      <AdminUsersList />

    </div>
  );
}