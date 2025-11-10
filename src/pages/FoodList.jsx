import React, { useState, useEffect } from 'react';
import FoodService from '../services/FoodService';
import { Link } from 'react-router-dom'; 

function FoodList() {
    const [foods, setFoods] = useState([]);

    return (
        <div className="food-list-container">
            <h2>Your Food Inventory</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map(food => (
                        <tr key={food.id}>
                            <td>{food.name}</td>
                            <td>{food.quantity}</td>
                            <td>
                                {/* Edit Link */}
                                <Link to={`/foods/update/${food.id}`} 
                                className="edit-button">
                                  Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FoodList;