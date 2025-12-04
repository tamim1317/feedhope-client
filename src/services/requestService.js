import axios from "axios";

// Base API URL for requests
const API_URL = "https://feedhope-server.vercel.app/api/requests";

// Helper function to set Authorization header
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

// FETCH all requests (for admin or global view)
export const fetchRequests = async (token) => {
  const res = await axios.get(API_URL, getAuthHeaders(token));
  return res.data;
};

// FETCH requests of the logged-in user
export const fetchMyRequests = async (token) => {
  const res = await axios.get(`${API_URL}/my-requests`, getAuthHeaders(token));
  return res.data;
};

// CREATE a new request
export const addRequest = async (requestData, token) => {
  const res = await axios.post(API_URL, requestData, getAuthHeaders(token));
  return res.data;
};

// UPDATE a request (e.g., change status)
export const updateRequest = async (id, requestData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, requestData, getAuthHeaders(token));
  return res.data;
};

// DELETE a request
export const deleteRequest = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
  return res.data;
};
