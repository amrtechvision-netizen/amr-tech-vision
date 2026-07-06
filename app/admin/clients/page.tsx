import AddClient from "@/components/admin/AddClient";
import ClientsList from "@/components/admin/ClientsList";

export default function ClientsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Clients Management
        </h1>

        <p className="text-gray-400 mt-2">
          Add, edit and manage client companies.
        </p>
      </div>

      <AddClient />

      <ClientsList />

    </div>
  );
}