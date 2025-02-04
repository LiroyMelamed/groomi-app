import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";

export const LoginScreenName = '/LoginScreen';

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5088/api/Auth/login", {
                username,
                passwordHash: password,
            });

            const { token } = response.data;
            login(token); // Save token and set authenticated state
        } catch (err) {
            console.error(err);
            setError("Invalid username or password.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
