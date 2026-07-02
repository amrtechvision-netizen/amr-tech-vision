const stats = [
  {
    number: "50+",
    title: "Projects Completed",
  },
  {
    number: "25+",
    title: "Happy Clients",
  },
  {
    number: "5+",
    title: "Years Experience",
  },
  {
    number: "24/7",
    title: "Support",
  },
];

export default function Stats() {
  return (
    <section className="bg-cyan-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-5xl font-bold">
                {item.number}
              </h2>

              <p className="mt-3 text-lg">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}