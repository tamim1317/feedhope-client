import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FoodService from '../services/FoodService'; 

function UpdateFood() {
    const { foodId } = useParams(); 
    const navigate = useNavigate();

    const [food, setFood] = useState({
        name: '',
        quantity: '', 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Fetch Food Data ---
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const data = await FoodService.getFoodById(foodId);
                setFood(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load food details.');
                setLoading(false);
            }
        };
        fetchFood();
    }, [foodId]);

    // ---  Handle Input Changes ---
    const handleChange = (e) => {
        setFood({
            ...food,
            [e.target.name]: e.target.value,
        });
    };

    // --- Handle Form Submission ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await FoodService.updateFood(foodId, food);
            alert('Food updated successfully!');
            navigate('/foods');
        } catch (err) {
            setError('Failed to update food. Please try again.');
        }
    };

    if (loading) return <div>Loading food details...</div>;
    if (error) return <div>Error: {error}</div>;

    // --- Render the Form ---
    return (
        <div className="update-food-container">
            <h2>Update Food Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Food Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={food.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={food.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>  
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default UpdateFood;