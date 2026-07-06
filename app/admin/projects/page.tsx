import AddProject from "@/components/admin/AddProject";
import ProjectsList from "@/components/admin/ProjectsList";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Projects Management
        </h1>

        <p className="text-gray-400 mt-2">
          Add, Edit and Delete your company projects.
        </p>
      </div>

      <AddProject />

      <ProjectsList />

    </div>
  );
}