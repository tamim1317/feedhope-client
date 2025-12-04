import React, { useState } from "react";
import { Link } from "react-router-dom";
import FoodRequestModal from "./FoodRequestModal";

const FoodCard = ({ food, onRequestFood }) => {
  const [showModal, setShowModal] = useState(false);

  const handleRequestClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {food.name}
        </h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{food.description}</p>
        <p className="text-sm text-teal-600 font-medium mb-3">
          Category: {food.category}
        </p>

        <div className="flex gap-2">
          <Link
            to={`/foods/${food.id || food._id}`}
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition"
          >
            View Details
          </Link>

          <button
            onClick={handleRequestClick}
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition"
          >
            Request Food
          </button>
        </div>
      </div>

      {showModal && (
        <FoodRequestModal
          food={food}
          onClose={handleCloseModal}
          onRequest={onRequestFood}
        />
      )}
    </div>
  );
};

export default FoodCard;
