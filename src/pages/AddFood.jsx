import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodForm from "../components/FoodForm";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const url =`https://feedhope-server.vercel.app/api/foods`
const AddFood = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddFood = async (data) => {
    if (!user) {
      toast.error("You must be logged in to add food!");
      return;
    }

    setLoading(true);
    try {
      // Post the new food with userId
      const result = await axios.post(
        url,
        { ...data, userId: user.uid },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("result", result)

      toast.success("Food added successfully!");
      navigate("/manage-my-foods");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-teal-700 mb-6 text-center">
        🍛 Add a New Food Donation
      </h1>
      <FoodForm onSubmit={handleAddFood} loading={loading} />
    </div>
  );
};

export default AddFood;
