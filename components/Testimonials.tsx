const testimonials = [
  {
    name: "ABC Builders",
    review:
      "Excellent CCTV and Fire Alarm installation. Professional team and timely delivery.",
  },
  {
    name: "XYZ Industries",
    review:
      "Highly recommended for ELV and Security solutions. Great support.",
  },
  {
    name: "Sunrise Hospital",
    review:
      "Quality work and reliable AMC services. Very satisfied.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-cyan-400">
          Client Testimonials
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 p-8 rounded-xl border border-slate-700"
            >
              <p className="text-gray-300">⭐⭐⭐⭐⭐</p>
              <p className="mt-4">{item.review}</p>
              <h3 className="mt-6 font-bold text-cyan-400">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}