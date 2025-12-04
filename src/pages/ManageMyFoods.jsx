import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";

const ManageMyFoods = () => {
  const { user } = useAuth();
  const [deletingId, setDeletingId] = useState(null);

  // Only fetch if user exists
  const { data: foods, loading, error, refetch } = useFetch(
    user ? `https://feedhope-server.vercel.app/api/foods/my-foods?userId=${user.uid}` : null
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`https://feedhope-server.vercel.app/api/foods/${id}`);
      toast.success("Food deleted successfully");
      setDeletingId(null);
      refetch(); // refresh foods after deletion
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete food");
      setDeletingId(null);
    }
  };

  if (!user)
    return <p className="text-center mt-10 text-red-500">Please log in to manage your foods</p>;

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading your foods. Please try again later.
      </p>
    );

  if (!foods?.length)
    return <p className="text-center mt-10 text-gray-500">You have no foods added</p>;

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-teal-700">Manage My Foods</h2>
      <ul className="space-y-4">
        {foods.map((food) => (
          <li
            key={food._id}
            className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white hover:shadow-md transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{food.name}</h3>
              <p className="text-gray-600">{food.description}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/update-food/${food._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
              >
                Edit
              </Link>
              <button
                className={`px-3 py-1 rounded text-white ${
                  deletingId === food._id ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                } transition`}
                onClick={() => handleDelete(food._id)}
                disabled={deletingId === food._id}
              >
                {deletingId === food._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMyFoods;
