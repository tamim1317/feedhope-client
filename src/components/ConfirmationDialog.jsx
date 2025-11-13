import React from "react";
import { motion } from "framer-motion";

export default function ConfirmationDialog({
  title,
  message,
  confirmText,
  confirmColor,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-5">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`${confirmColor} px-4 py-2 text-white rounded-lg hover:opacity-90 transition`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
