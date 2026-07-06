import AddGallery from "@/components/admin/AddGallery";
import GalleryList from "@/components/admin/GalleryList";

export default function GalleryPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-cyan-400">
          Gallery Management
        </h1>

        <p className="text-gray-400 mt-2">
          Upload and manage gallery images.
        </p>
      </div>

      <AddGallery />

      <GalleryList />

    </div>
  );
}