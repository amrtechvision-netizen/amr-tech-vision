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
    <section className="bg-slate-950 text-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400">
          Client Testimonials
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base mt-3">
  What our clients say about our ELV & Security services
</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {testimonials.map((item, index) => (
            <div
  key={index}
  className="bg-slate-900 p-6 sm:p-8 rounded-xl border border-slate-700 shadow-lg hover:border-cyan-400 hover:shadow-cyan-500/30 hover:-translate-y-2 transition-all duration-300"
>
  <div className="text-4xl text-cyan-400 mb-3">
  ❝
</div>
              <p className="text-yellow-400 text-xl">
  ⭐⭐⭐⭐⭐
</p>
              <p className="mt-4 text-gray-300 text-sm sm:text-base leading-7 italic">
  "{item.review}"
</p>
              <h3 className="mt-6 text-lg font-bold text-cyan-400">
  {item.name}
</h3>
<p className="text-gray-500 text-sm mt-1">
  Verified Client
</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}