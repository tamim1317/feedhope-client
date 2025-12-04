import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState({ name: "", description: "", quantity: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch existing food data
  useEffect(() => {
    const fetchFood = async () => {
      setFetching(true);
      try {
        const res = await fetch(
      `https://feedhope-server.vercel.app/api/foods/my-foods?userId=${userId}`,
      { credentials: "include" }
    );
        setFood(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching food data.");
      } finally {
        setFetching(false);
      }
    };
    fetchFood();
  }, [id]);

  // Handle form update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://feedhope-server.onrender.com/api/foods/${id}`, food);
      toast.success("Food updated successfully!");
      navigate("/manage-my-foods"); // redirect to manage page
    } catch (err) {
      console.error(err);
      toast.error("Failed to update food.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center py-10">Loading food details...</p>;

  return (
    <div className="max-w-md mx-auto my-8 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Update Food</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Food Name"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={food.name}
          onChange={(e) => setFood({ ...food, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={food.description}
          onChange={(e) => setFood({ ...food, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Quantity (e.g., 5 servings)"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={food.quantity || ""}
          onChange={(e) => setFood({ ...food, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (BDT)"
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={food.price || ""}
          onChange={(e) => setFood({ ...food, price: e.target.value })}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform disabled:from-gray-400 disabled:to-gray-500"
        >
          {loading ? "Updating..." : "Update Food"}
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
