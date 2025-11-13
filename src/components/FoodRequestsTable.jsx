import { fetchFoodRequests, updateRequestStatus } from "../services/api";
import ConfirmationDialog from "./ConfirmationDialog";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

function FoodRequestsTable({ foodId, onStatusChange }) {
    const { getToken } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        requestId: null,
        newStatus: null,
        actionName: '',
        confirmColor: '',
    });

    const fetchRequests = async () => {
        if (!foodId) return;
        try {
            setLoading(true);
            const token = await getToken();
            const response = await fetchFoodRequests(foodId, token);
            setRequests(response);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to load food requests.");
            toast.error("Failed to load food requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [foodId]);

    const openConfirmation = (requestId, newStatus) => {
        const actionName = newStatus === 'Accepted' ? 'Accept' : 'Reject';
        const confirmColor = newStatus === 'Accepted' ? 'bg-green-600' : 'bg-red-600';
        setDialogState({ isOpen: true, requestId, newStatus, actionName, confirmColor });
    };

    const closeConfirmation = () => setDialogState({ isOpen: false, requestId: null, newStatus: null, actionName: '', confirmColor: '' });

    const handleStatusUpdate = async () => {
        const { requestId, newStatus, actionName } = dialogState;
        closeConfirmation();

        try {
            const token = await getToken();
            await updateRequestStatus(requestId, newStatus, token);
            toast.success(`${actionName}ed request successfully!`);
            fetchRequests();

            if (newStatus === 'Accepted' && onStatusChange) onStatusChange('Donated');

        } catch (err) {
            console.error(err);
            toast.error(`Failed to ${actionName.toLowerCase()} request`);
        }
    };

    const getStatusStyles = (status) => {
        switch(status) {
            case 'Accepted': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) return <div className="text-center py-5 text-gray-500">Loading requests...</div>;
    if (error) return <div className="text-center text-red-600 py-5">{error}</div>;

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="mr-2">🍽️</span> Food Requests ({requests.length})
            </h2>
            <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                {requests.length === 0 ? (
                    <p className="text-gray-500 p-4 italic">No requests yet.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requests.map(req => (
                                <tr key={req._id || req.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="p-3 font-semibold">{req.requesterName}</td>
                                    <td className="p-3 max-w-xs text-gray-600">{req.requestLocation}</td>
                                    <td className="p-3 text-gray-600">{req.contactNo}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusStyles(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        {req.status === 'Pending' ? (
                                            <>
                                                <button onClick={() => openConfirmation(req._id, 'Accepted')} className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Accept</button>
                                                <button onClick={() => openConfirmation(req._id, 'Rejected')} className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Reject</button>
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">Action Taken</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {dialogState.isOpen && (
                <ConfirmationDialog
                    title={`Confirm ${dialogState.actionName} Request`}
                    message={`Are you sure you want to ${dialogState.actionName.toLowerCase()} this request?`}
                    confirmText={dialogState.actionName}
                    confirmColor={dialogState.confirmColor}
                    onConfirm={handleStatusUpdate}
                    onCancel={closeConfirmation}
                />
            )}
        </div>
    );
}

export default FoodRequestsTable;
