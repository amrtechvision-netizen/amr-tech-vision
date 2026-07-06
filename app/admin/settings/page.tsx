import SettingsForm from "@/components/admin/SettingsForm";
import SettingsPreview from "@/components/admin/SettingsPreview";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Website Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage company information and social links.
        </p>
      </div>

      <SettingsForm />

      <SettingsPreview />

    </div>
  );
}