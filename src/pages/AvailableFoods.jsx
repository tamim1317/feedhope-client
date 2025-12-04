import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

const AvailableFoods = () => {
  const { data: foods, loading, error } = useFetch("/foods.json");

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center mt-6">Error loading foods</p>;
  if (!foods?.length) return <p className="text-center mt-6">No foods available right now.</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-teal-700">
        🍱 Available Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food) => (
          <div
            key={food.id || food._id}
            className="border rounded-lg shadow p-5 flex flex-col justify-between"
          >
            <img
              src={food.image || "/placeholder.png"}
              alt={food.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-lg mb-2">{food.name}</h3>
            <p className="text-gray-600 mb-3">{food.description || "No description available"}</p>
            <Link
              to={`/food/${food.id || food._id}`}
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
