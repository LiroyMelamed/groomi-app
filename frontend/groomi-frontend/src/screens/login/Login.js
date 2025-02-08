import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import SimpleScreen from "../../components/simpleComponents/SimpleScreen";
import SimpleContainer from "../../components/simpleComponents/SimpleContainer";
import PrimaryCard from "../../components/designedComponents/PrimaryCard";
import SimpleInput from "../../components/simpleComponents/SimpleInput";
import PrimaryInput from "../../components/designedComponents/PrimaryInput";
import { TextBold40 } from "../../components/specialComponents/text/AllTextKindFile";
import useScreenSize from "../../hooks/useScreenSize";
import SimpleImage from "../../components/simpleComponents/SimpleImage";
import { images } from "../../assets/images/images";
import PrimaryButton from "../../components/designedComponents/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { GroomingQueueScreenName } from "../mainScreenClient/GroomingQueue";
import TertiaryButton from "../../components/designedComponents/TertiaryButton";
import { RegisterScreenName } from "../register/Register";

export const LoginScreenName = "/LoginScreen";

const APP_TITLE = 'Groomi'

export default function LoginScreen() {
    const navigate = useNavigate()
    const { isSmallScreen } = useScreenSize();
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

            const { data } = response.data;
            if (!data) throw new Error("Token not received from server.");

            login(data);
            navigate(GroomingQueueScreenName)
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            setError(err.response?.data || "An error occurred. Please try again.");
        }
    };

    return (
        <SimpleScreen style={{ justifyContent: 'center', alignItems: 'center' }}>
            <SimpleContainer
                style={styles.mainContainerStyle(isSmallScreen)}
            >
                <PrimaryCard
                    style={styles.cardStyle}
                >
                    <TextBold40>{APP_TITLE}</TextBold40>
                    <PrimaryInput
                        type="text"
                        title="Username"
                        value={username}
                        onChange={(text) => setUsername(text)}
                        style={{ marginTop: 24 }}
                    />
                    <PrimaryInput
                        type="password"
                        title="Password"
                        value={password}
                        onChange={(text) => setPassword(text)}
                        style={{ marginTop: 12 }}
                    />

                    <SimpleContainer>
                        <PrimaryButton style={{ marginTop: 24 }} onClick={handleLogin}>Login</PrimaryButton>

                        <TertiaryButton style={{ marginTop: 24, marginLeft: 8 }} onClick={() => navigate(RegisterScreenName)}>Register</TertiaryButton>
                    </SimpleContainer>

                </PrimaryCard>

                {!isSmallScreen && (
                    <SimpleImage
                        src={images.CorgiFace}
                        style={styles.imageStyle}
                    />
                )}
            </SimpleContainer>
        </SimpleScreen>
    );
}

const styles = {
    mainContainerStyle: (isSmallScreen) => ({
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
    }),

    cardStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },

    imageStyle: {
        position: 'absolute',
        right: '-320px',
        top: '80%',
        transform: 'translateY(-50%)',
        width: '100%',
        maxWidth: '600px',
        objectFit: 'contain',
    }
}



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