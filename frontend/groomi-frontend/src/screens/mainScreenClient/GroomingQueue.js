import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import api from "../../api/ApiUtils";

export const GroomingQueueScreenName = '/GroomingQueueScreen';

export default function GroomingQueueScreen() {
    const [queue, setQueue] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const { logout } = useAuth();

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        try {
            console.log("Token being sent:", localStorage.getItem("token")); // ✅ Debugging log
            const response = await api.get("/GroomingQueue");
            setQueue(response.data);
        } catch (error) {
            console.error("Failed to fetch queue:", error.response?.data || error.message);
        }
    };

    const handleAdd = async () => {
        try {
            const newEntry = { customerName, appointmentTime };
            console.log("📤 Sending request:", newEntry); // ✅ Log request before sending
            await api.post("/GroomingQueue", newEntry);
            fetchQueue();
            setCustomerName("");
            setAppointmentTime("");
        } catch (error) {
            console.error("❌ Failed to add entry:", error.response?.data || error.message);
        }
    };


    const handleDelete = async (id) => {
        try {
            await api.delete(`/GroomingQueue/${id}`); // ✅ Now includes the JWT token
            fetchQueue();
        } catch (error) {
            console.error("Failed to delete entry:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Grooming Queue</h2>
            <button onClick={logout} style={{ marginBottom: "20px" }}>
                Logout
            </button>
            <div>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                />
                <button onClick={handleAdd}>Add to Queue</button>
            </div>
            <ul>
                {queue.map((entry) => (
                    <li key={entry.id}>
                        {entry.customerName} - {new Date(entry.appointmentTime).toLocaleString()}
                        <button onClick={() => handleDelete(entry.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}