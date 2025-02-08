import React, { useState } from "react";
import SimpleScreen from "../../components/simpleComponents/SimpleScreen";
import SimpleContainer from "../../components/simpleComponents/SimpleContainer";
import PrimaryCard from "../../components/designedComponents/PrimaryCard";
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
import useHttpRequest from "../../hooks/useHttpRequest";
import loginApi from "../../api/LoginApi";
import { useAuth } from "../../providers/AuthProvider";

export const LoginScreenName = "/LoginScreen";

const APP_TITLE = 'Groomi'

export default function LoginScreen() {
    const navigate = useNavigate()
    const { isSmallScreen } = useScreenSize();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState("");
    const { login } = useAuth()

    const { performRequest: loginRequest, isPerforming } = useHttpRequest(loginApi.login, (data) => {
        login(data);
        navigate(GroomingQueueScreenName)
    });

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
                        <PrimaryButton isPerforming={isPerforming} style={{ marginTop: 24 }} onClick={() => loginRequest(username, password)}>Login</PrimaryButton>

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