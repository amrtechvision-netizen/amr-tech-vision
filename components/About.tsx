export default function About() {
  return (
    <section
      id="about"
      className="bg-slate-900 text-white py-20 px-6"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div>
          <img
            src="/images/logo.png"
            alt="AMR TECH VISION"
            className="rounded-xl shadow-1xl"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-cyan-400 mb-6">
            About AMR TECH VISION
          </h2>

          <p className="text-gray-300 leading-8">
            AMR TECH VISION is a leading provider of ELV and Security
            Solutions in India. We specialize in CCTV Surveillance,
            Fire Alarm Systems, Access Control, PA System, BMS,
            Networking, Structured Cabling and Smart Building
            Technologies.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-10">

            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-cyan-400">50+</h3>
              <p className="mt-2">Projects Completed</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-cyan-400">100%</h3>
              <p className="mt-2">Client Satisfaction</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}