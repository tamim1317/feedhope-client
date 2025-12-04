import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { data: foods, loading, error } = useFetch("/foods.json");

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center mt-6">❌ Error loading foods</p>;
  if (!foods?.length) return <p className="text-center mt-6 text-gray-600">No foods available right now.</p>;

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      {/* Featured Foods Section */}
      <section>
        <h2 className="text-4xl font-extrabold text-teal-700 mb-8 text-center">🌟 Featured Foods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.slice(0, 6).map((food) => (
            <div
              key={food.id || food._id}
              className="border rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300"
            >
              <img
                src={food.image || "/placeholder.png"}
                alt={food.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-semibold text-xl mb-2">{food.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{food.description || "No description available"}</p>
                <Link
                  to={`/food/${food.id || food._id}`}
                  className="mt-auto bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-center font-medium shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-gradient-to-r from-teal-50 to-teal-100 p-10 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-teal-800">Our Mission</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
          Our mission is to reduce food waste and help those in need by connecting donors with recipients in a
          seamless and transparent way. Every contribution matters, and together we can make a real difference.
        </p>
      </section>
    </div>
  );
};

export default Home;
