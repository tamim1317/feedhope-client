import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const IMG_BB_API_KEY = 'YOUR_IMGBB_API_KEY';

const AddFood = () => {
    // Get user and token from context
    const { user, firebaseToken } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        food_name: '',
        food_quantity: '',
        pickup_location: '',
        expire_date: '',
        additional_notes: '',
        food_image: null,
    });

    if (!user) {
        return <p>Redirecting...</p>; 
    }

const uploadImageToImgBB = async (imageFile) => {
    if (!imageFile) return null;

    const imgBBFormData = new FormData();
    imgBBFormData.append('image', imageFile);

    try {
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
            {
              method: 'POST',
              body: imgBBFormData,
            }
        );

        if (!response.ok) {
            throw new Error('Image upload failed on ImgBB.');
        }

        const data = await response.json();
        return data.data.url; 
    } catch (error) {
        console.error("ImgBB Upload Error:", error);
        throw new Error('Could not upload image.');
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the image file and other form data
    const { food_image, ...dataWithoutImage } = formData; 

    try {
        // Upload image and get the URL
        const imageUrl = await uploadImageToImgBB(food_image);
        
        if (!imageUrl) {
             throw new Error("Food image is required.");
        }

        // Prepare final data object
        const finalFoodData = {
            ...dataWithoutImage,
            food_image: imageUrl,
            donator_name: user.displayName || 'Anonymous Donor',
            donator_email: user.email,
            donator_image: user.photoURL || 'default_user_url',
        };

        // Submit server using the authenticated API service
        await api(firebaseToken).post('/foods', finalFoodData);

        // Success Feedback
        toast.success('Food successfully added for sharing!');
        navigate('/manage-my-foods'); 

    } catch (error) {
        // Error Feedback
        console.error("Submission Error:", error);
        // toast.error(error.message || 'Failed to add food. Please try again.');
    } finally {
        setLoading(false);
    }
};

return (
    <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Add A Surplus Food Item</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            
            {/* Food Name */}
            <div className="mb-4">
                <label className="block text-gray-700">Food Name</label>
                <input 
                    type="text" 
                    name="food_name" 
                    onChange={(e) => setFormData({...formData, food_name: e.target.value})}
                    required 
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>

            {/* Food Image */}
            <div className="mb-4">
                <label className="block text-gray-700">Food Image (upload to ImgBB)</label>
                <input 
                    type="file" 
                    name="food_image" 
                    onChange={(e) => setFormData({...formData, food_image: e.target.files[0]})}
                    accept="image/*"
                    required 
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            
            {/* Food Quantity */}
            <div className="mb-4">
                <label className="block text-gray-700">Food Quantity (e.g., "Serves 5 people")</label>
                <input 
                    type="text" 
                    name="food_quantity" 
                    onChange={(e) => setFormData({...formData, food_quantity: e.target.value})}
                    required 
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>

            {/* Pickup Location */}
            <div className="mb-4">
                <label className="block text-gray-700">Pickup Location</label>
                <input 
                    type="text" 
                    name="pickup_location" 
                    onChange={(e) => setFormData({...formData, pickup_location: e.target.value})}
                    required 
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>

            {/* Expire Date */}
            <div className="mb-4">
                <label className="block text-gray-700">Expire Date</label>
                <input 
                    type="date" 
                    name="expire_date" 
                    onChange={(e) => setFormData({...formData, expire_date: e.target.value})}
                    required 
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>

            {/* Additional Notes */}
            <div className="mb-4">
                <label className="block text-gray-700">Additional Notes</label>
                <textarea 
                    name="additional_notes" 
                    onChange={(e) => setFormData({...formData, additional_notes: e.target.value})}
                    rows="4" 
                    className="w-full px-3 py-2 border rounded-lg"
                ></textarea>
            </div>
            
            {/* Donator Info */}
            <div className="mb-4 bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-600">
                    Donator: **{user.displayName || user.email}** (Info auto-filled)
                </p>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
                {loading ? 'Adding Food...' : 'Add Food Item'}
            </button>
        </form>
    </div>
   );
 };
export default AddFood;