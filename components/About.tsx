export default function About() {
  return (
    <section
  id="about"
  className="bg-slate-900 text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8"
>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

        <div>
          <img
  src="/images/logo2.jpeg"
  alt="AMR TECH VISION"
  className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto rounded-xl shadow-2xl"
/>
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-5 text-center md:text-left">
            About AMR TECH VISION
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 text-center md:text-left">
            AMR TECH VISION is a leading provider of ELV and Security
            Solutions in India. We specialize in CCTV Surveillance,
            Fire Alarm Systems, Access Control, PA System, BMS,
            Networking, Structured Cabling and Smart Building
            Technologies.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8">

            <div className="bg-slate-800 rounded-xl p-4 sm:p-6 text-center hover:bg-slate-700 transition">
              <h3 className="text-3xl sm:text-4xl font-bold text-cyan-400">50+</h3>
              <p className="mt-2 text-sm sm:text-base">Projects Completed</p>
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