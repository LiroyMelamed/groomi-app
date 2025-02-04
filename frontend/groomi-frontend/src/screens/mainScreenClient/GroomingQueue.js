import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";

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
        const response = await axios.get("http://localhost:5088/api/GroomingQueue");
        setQueue(response.data);
    };

    const handleAdd = async () => {
        const newEntry = { customerName, appointmentTime };
        await axios.post("http://localhost:5088/api/GroomingQueue", newEntry);
        fetchQueue();
        setCustomerName("");
        setAppointmentTime("");
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5088/api/GroomingQueue/${id}`);
        fetchQueue();
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