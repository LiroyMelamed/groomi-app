import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import SimpleScreen from "../../components/simpleComponents/SimpleScreen";
import SimpleContainer from "../../components/simpleComponents/SimpleContainer";
import PrimaryCard from "../../components/designedComponents/PrimaryCard";
import SimpleInput from "../../components/simpleComponents/SimpleInput";
import PrimaryInput from "../../components/designedComponents/PrimaryInput";

export const LoginScreenName = "/LoginScreen";

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
            if (!token) throw new Error("Token not received from server.");

            login(token); // ✅ Save token and update auth state
            console.log("Login successful!");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            setError(err.response?.data || "An error occurred. Please try again.");
        }
    };

    return (
        <SimpleScreen
            style={{ justifyContent: 'center' }}
        >
            <SimpleContainer style={{ flexDirection: 'row' }}>
                <PrimaryCard style={{ flexDirection: 'column' }}>
                    
                    <PrimaryInput
                        type="text"
                        title="Username"
                        value={username}
                        onChange={(text) => setUsername(text)}
                    />

                    <PrimaryInput
                        type="password"
                        title="Password"
                        value={password}
                        onChange={(text) => setPassword(text)}
                    />
                </PrimaryCard>
            </SimpleContainer>
        </SimpleScreen>
        // <div>
        //     <h2>Login</h2>
        //     <input
        //         type="text"
        //         placeholder="Username"
        //         value={username}
        //         onChange={(e) => setUsername(e.target.value)}
        //     />
        //     <input
        //         type="password"
        //         placeholder="Password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //     />
        //     {error && <p style={{ color: "red" }}>{error}</p>}
        //     <button onClick={handleLogin}>Login</button>
        // </div>
    );
}
