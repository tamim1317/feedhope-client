import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
    const expiryDate = new Date(food.expire_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 transition duration-300 hover:shadow-2xl">
            {/* Food Image */}
            <img 
                src={food.food_image} 
                alt={food.food_name} 
                className="w-full h-48 object-cover object-center" 
            />

            <div className="p-5 flex flex-col flex-grow">
                {/* Food Name & Quantity */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{food.food_name}</h3>
                <p className="text-sm font-semibold text-green-600 mb-4">{food.food_quantity}</p>

                {/* Pickup Location & Expiry */}
                <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Location:</span> {food.pickup_location}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                    <span className="font-medium">Expires:</span> {expiryDate}
                </p>

                {/* Donator Info */}
                <div className="flex items-center mt-auto border-t pt-3">
                    <img 
                        src={food.donator_image} 
                        alt={food.donator_name} 
                        className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <p className="text-xs font-medium text-gray-700">{food.donator_name}</p>
                </div>
            </div>

            {/* View Details Button */}
            <div className="p-5 pt-0">
                <Link to={`/food/${food._id}`} className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default FoodCard;