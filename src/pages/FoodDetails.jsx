import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import { AlertTriangle } from "lucide-react";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get("/foods.json"); // local JSON
        const found = response.data.find((item) => item.id === parseInt(id));
        if (!found) throw new Error("Food not found");
        setFood(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  // Custom “Food Not Found” UI
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-lg">
          <h1 className="text-7xl font-extrabold text-blue-900 mb-4 animate-bounce">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 mr-3 text-red-600" />
            Oops! Food Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The food you were looking for might have expired or doesn't exist. Let's get you back to the available listings!
          </p>
          <Button
            onClick={() => {
              if (window.history.length > 2) navigate(-1);
              else navigate("/available-foods");
            }}
            className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-lg text-lg"
          >
            ← Back to Available Foods
          </Button>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="shadow-lg rounded-2xl overflow-hidden border border-gray-100 bg-white">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-80 object-cover"
          />
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{food.name}</h1>
            <p className="text-gray-600 italic">Category: {food.category}</p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-green-600">
                🍽️ Quantity: {food.quantity || "Not specified"}
              </span>
              <span className="text-xl font-bold text-blue-700">
                💰 {food.price ? `${food.price} BDT` : "Free"}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {food.description || "No description available."}
            </p>

            <Button
              onClick={() => {
                if (window.history.length > 2) navigate(-1);
                else navigate("/available-foods");
              }}
              className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              ← Back to Available Foods
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodDetails;
