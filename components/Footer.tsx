export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-cyan-400">
          AMR TECH VISION
        </h2>

        <p className="mt-4 text-gray-400">
          Complete ELV & Security Solution Provider
        </p>

        <div className="mt-6 space-y-2">
          <p>📍 Room No. 9, Ground Floor, Social Nagar, Mahatma Gandhi Road, Mumbai - 400017</p>

          <p>📞 +91 9052620763</p>

          <p>📧 amrtechvision@gmail.com</p>
        </div>

        <div className="flex gap-6 mt-8">

          <a
            href="https://www.instagram.com/amrtechvision"
            target="_blank"
          >
            Instagram
          </a>

          <a
            href="https://www.facebook.com/share/1DP5G5mkiD/"
            target="_blank"
          >
            Facebook
          </a>

          <a
            href="https://www.youtube.com/channel/UCrW9v2jVQdem92ur3GMKJqg"
            target="_blank"
          >
            YouTube
          </a>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-gray-500 text-center">
          © 2026 AMR TECH VISION. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}