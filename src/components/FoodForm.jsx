// src/components/FoodForm.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const FoodForm = ({ onSubmit, loading }) => {
  const { currentUser } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    imageUrl: "",
    pickupLocation: "",
    expireDate: "",
    donatorName: currentUser?.displayName || "",
    donatorEmail: currentUser?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-gray-800 font-medium p-4 sm:p-6 bg-white rounded-xl shadow-lg"
    >
      {/* Food Name & Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 text-teal-700 font-semibold flex items-center">
            🍱 Food Name
          </label>
          <input
            type="text"
            name="foodName"
            placeholder="Enter food name"
            value={formData.foodName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-teal-700 font-semibold flex items-center">
            👥 Quantity (Serves # people)
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="e.g., 5"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block mb-2 text-teal-700 font-semibold flex items-center">
          🖼️ Food Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          placeholder="Paste image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />
      </div>

      {/* Pickup & Expiry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 text-teal-700 font-semibold flex items-center">
            📍 Pickup Location
          </label>
          <input
            type="text"
            name="pickupLocation"
            placeholder="Enter pickup address"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-teal-700 font-semibold flex items-center">
            🕒 Expire Date
          </label>
          <input
            type="date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            min={today}
            required
            className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Donator Info */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-teal-50 to-green-100 border border-teal-300 shadow-inner">
        <h2 className="text-lg font-bold text-teal-800 mb-3">👤 Donator Info (Auto-filled)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" value={formData.donatorName} readOnly className="w-full px-4 py-3 bg-gray-200 rounded-lg" />
          <input type="email" value={formData.donatorEmail} readOnly className="w-full px-4 py-3 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 mt-6 text-white font-bold text-lg rounded-xl transition-all transform ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-teal-500 to-green-600 hover:shadow-2xl hover:scale-[1.01]"
        }`}
      >
        {loading ? "Submitting..." : "List Food for Donation"}
      </button>
    </form>
  );
};

export default FoodForm;
