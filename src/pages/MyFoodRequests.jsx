import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyFoodRequests = () => {
  const { getToken, user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await axios.get(`http://localhost:5000/api/foods/my-foods?userId=${user?.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [getToken, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading requests!</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">My Food Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req._id} className="border p-3 rounded mb-2">
              <p><strong>Food:</strong> {req.name}</p>
              <p><strong>Quantity:</strong> {req.quantity}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyFoodRequests;