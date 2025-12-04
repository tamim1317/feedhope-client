import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const FoodsList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("/foods.json");
        if (!res.ok) throw new Error("Failed to load JSON");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-500 py-10 font-semibold">
        {error}
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-teal-700">🍽️ Available Foods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food.id}
            className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-xl mb-2">{food.name}</h3>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Quantity:</span> {food.quantity}
            </p>
            <p className="text-gray-700">{food.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodsList;
