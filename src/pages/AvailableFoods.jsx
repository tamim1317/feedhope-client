import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import FoodCard from '../components/FoodCard';
import LoadingSpinner from '../components/LoadingSpinner'; 

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        api(null).get('/available-foods')
            .then(data => {
                setFoods(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setError('Failed to fetch available foods. Please try again.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 mt-10">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Available Foods Ready to Share</h1>
            
            {foods.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No food items are currently available for donation.</p>
            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {foods.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableFoods;