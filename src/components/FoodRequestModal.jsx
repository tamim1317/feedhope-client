import React, { useState } from "react";
import { toast } from "react-toastify";

const FoodRequestModal = ({ food, onClose, onRequest }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!message) return toast.error("Please add a message");

    setLoading(true);
    try {
      await onRequest({ foodId: food._id, message });
      toast.success("Request sent successfully!");
      setMessage("");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error sending request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-lg font-bold mb-3">Request {food.name}</h2>
        <textarea
          className="w-full border px-3 py-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Add a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded border hover:bg-gray-100 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
            onClick={handleRequest}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodRequestModal;


