export default function Clients() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-center">
          Our Clients
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">

          <div className="shadow-lg p-8 rounded-xl">🏢 Corporate</div>

          <div className="shadow-lg p-8 rounded-xl">🏨 Hotels</div>

          <div className="shadow-lg p-8 rounded-xl">🏥 Hospitals</div>

          <div className="shadow-lg p-8 rounded-xl">🏫 Schools</div>

        </div>

      </div>
    </section>
  );
}