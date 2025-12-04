import axios from "axios";

const API = "https://feedhope-server.vercel.app/api/foods";

export const fetchFoods = () => axios.get(API).then(res => res.data);
export const fetchMyFoods = (userId) => axios.get(`${API}/my-foods?userId=${userId}`).then(res => res.data);
export const addFood = (food) => axios.post(API, food).then(res => res.data);
export const updateFood = (id, food) => axios.put(`${API}/${id}`, food).then(res => res.data);
export const deleteFood = (id) => axios.delete(`${API}/${id}`).then(res => res.data);
