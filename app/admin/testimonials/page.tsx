import AddTestimonial from "@/components/admin/AddTestimonial";
import TestimonialsList from "@/components/admin/TestimonialsList";

export default function TestimonialsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-cyan-400">
          Testimonials Management
        </h1>

        <p className="text-gray-400 mt-2">
          Add and manage client testimonials.
        </p>

      </div>

      <AddTestimonial />

      <TestimonialsList />

    </div>
  );
}