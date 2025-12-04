import React from "react";
import { useFetch } from "../hooks/useFetch";

const MyFoodRequests = ({ userId }) => {
  const { data: foods, loading, error } = useFetch(
    `https://feedhope-server.vercel.app/api/foods/my-foods?userId=${userId}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!foods || foods.length === 0) return <p>No food requests found</p>;

  return (
    <div>
      <h2>My Food Requests</h2>
      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.name} - {food.quantity} pcs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFoodRequests;
