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
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Why Choose AMR TECH VISION
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Your trusted partner for complete ELV & Security Solutions
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {features.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-8 shadow hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold text-cyan-500">
                ✓ {item.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}