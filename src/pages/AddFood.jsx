import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodForm from "../components/FoodForm";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AddFood = () => {
  const navigate = useNavigate();
  const { getToken, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddFood = async (data) => {
    setLoading(true);
    try {
      const token = await getToken();
      await axios.post("http://localhost:5000/api/foods", { ...data, userId: user?.uid }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Food added successfully!");
      navigate("/available-foods");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
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
