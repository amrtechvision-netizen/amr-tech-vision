import AddService from "@/components/admin/AddService";
import ServicesList from "@/components/admin/ServicesList";

export default function ServicesPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Services Management
        </h1>

        <p className="text-gray-400 mt-2">
          Add, edit and manage all services.
        </p>
      </div>

      <AddService />

      <ServicesList />

    </div>
  );
}