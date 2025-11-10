import axios from 'axios'; 
const API_URL = 'http://localhost:5000/api/foods'; 

class FoodService {

    // Method to GET a single food item
    async getFoodById(id) {
        const response = await axios.get(`${API_URL}/${id}`); 
        return response.data;
    };

    // Method to PUT/PATCH the updated food items
    async updateFood(id, foodData) {
        const response = await axios.put(`${API_URL}/${id}`, foodData);
        return response.data;
    };
};

export default new FoodService();