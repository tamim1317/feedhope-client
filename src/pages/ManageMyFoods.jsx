import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ManageMyFoods = () => {
    const { firebaseToken } = useAuth();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching ---
const fetchMyFoods = async () => {
      setLoading(true);
        try {
            const data = await api(firebaseToken).get('/my-foods'); 
            setFoods(data);
            setError(null);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError('Failed to load your managed foods. Please log in again.');
            setFoods([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (firebaseToken) {
            fetchMyFoods();
        }
    }, [firebaseToken]); 

    // --- Delete Handler ---
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send authenticated Delete
                    await api(firebaseToken).delete(`/foods/${id}`);
                    
                    // Show success toast and update the list
                    toast.success('Food item deleted successfully!');
                    Swal.fire('Deleted!', 'Your food item has been deleted.', 'success');
                    fetchMyFoods();
                } catch (error) {
                    console.error("Deletion Error:", error);
                    toast.error('Failed to delete the food item.');
                    Swal.fire('Error!', 'Failed to delete the food item.', 'error');
                }
            }
        });
    };

    // --- Conditional Rendering ---
    if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
    }

    if (error) {
        return <div className="text-center text-red-600 mt-10">{error}</div>;
    }

    if (foods.length === 0) {
        return (
            <div className="text-center p-10">
                <h2 className="text-3xl font-semibold mb-4">No Foods Managed</h2>
                <p className="text-gray-600">You haven't added any food items yet. <Link to="/add-food" className="text-indigo-600 hover:underline">Add one now!</Link></p>
            </div>
        );
    }

return (
  <div className="container mx-auto p-4 md:p-8">
    <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Manage My Donated Foods ({foods.length})</h1>
            
    <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
         <thead className="bg-gray-200">
           <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
         </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{food.food_name}</td>
                    <td className="py-3 px-4 text-gray-600">{food.food_quantity}</td>
                    <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${food.food_status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {food.food_status}
                    </span>
                    </td>
                       <td className="py-3 px-4 text-center space-x-2">
            {/* Update Button */}
                <Link to={`/update-food/${food._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded text-sm transition">
                Update
                </Link>
                                    
            {/* Delete Button */}
              <button onClick={() => handleDelete(food._id)} className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded text-sm transition">
                Delete
                </button>
                   </td>
                </tr>
               ))}
           </tbody>
        </table>
      </div>
    </div>
   );
};

export default ManageMyFoods;