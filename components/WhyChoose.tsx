const features = [
  {
    title: "Certified Engineers",
    desc: "Experienced and certified technical team.",
  },
  {
    title: "24×7 Support",
    desc: "Quick response and maintenance support.",
  },
  {
    title: "Premium Quality",
    desc: "Top brands and high-quality installations.",
  },
  {
    title: "Affordable Pricing",
    desc: "Competitive pricing without compromising quality.",
  },
  {
    title: "On-Time Delivery",
    desc: "Projects completed within committed timelines.",
  },
  {
    title: "Trusted Company",
    desc: "Reliable ELV & Security System partner.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Why Choose AMR TECH VISION
        </h2>

        <p className="text-center text-gray-500 text-sm sm:text-base mt-3">
          Your trusted partner for complete ELV & Security Solutions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {features.map((item, index) => (
            <div
  key={index}
  className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
>
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-500 flex items-center gap-2">
  <span className="text-2xl">✅</span>
  {item.title}
</h3>

              <p className="mt-3 text-gray-600 text-sm sm:text-base leading-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}