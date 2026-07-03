export default function Clients() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900">
          Our Clients
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mt-3">
  We proudly serve clients across multiple industries.
</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 text-center">

          <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-xl p-5 sm:p-8">
            <div className="text-4xl mb-3">🏢</div>
            <h3 className="font-semibold">Corporate</h3>
          </div>

          <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-xl p-5 sm:p-8">
            <div className="text-4xl mb-3">🏨</div>
            <h3 className="font-semibold">Hotels</h3>
          </div>

          <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-xl p-5 sm:p-8">
            <div className="text-4xl mb-3">🏥</div>
            <h3 className="font-semibold">Hospitals</h3>
          </div>

          <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-xl p-5 sm:p-8">
            <div className="text-4xl mb-3">🏫</div>
            <h3 className="font-semibold">Schools</h3>
          </div>

        </div>

      </div>
    </section>
  );
}