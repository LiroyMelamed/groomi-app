import React, { useState } from "react";
import axios from "axios";

export const RegisterScreenName = '/RegisterScreen';

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5088/api/Auth/register", {
                username,
                passwordHash: password, // Fix: Send password as `passwordHash`
                fullName,
            });
            console.log("Registered:", response.data);
            alert("Registration successful! You can now log in.");
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}
