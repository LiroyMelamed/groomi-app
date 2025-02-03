import React, { useState } from "react";
import axios from "axios";

export const RegisterScreenName = '/RegisterScreen'

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                password,
                fullName,
            });
            console.log("Registered:", response.data);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};