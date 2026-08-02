import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-5xl font-bold text-green-700">
            About AgriConnect
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            AgriConnect is a smart digital platform designed to help farmers
            connect with modern agricultural technology, market information,
            and expert guidance. Our goal is to make farming easier, smarter,
            and more profitable.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-600">
                🌱 Smart Farming
              </h2>
              <p className="text-gray-600 mt-2">
                Learn modern techniques to improve crop yield and efficiency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-600">
                📊 Market Insights
              </h2>
              <p className="text-gray-600 mt-2">
                Get updated prices and demand trends for better selling decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-green-600">
                🤝 Farmer Support
              </h2>
              <p className="text-gray-600 mt-2">
                Connect with experts and get guidance anytime you need.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}