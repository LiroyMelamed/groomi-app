import React, { useState } from "react";
import axios from "axios";
import SimpleScreen from "../../components/simpleComponents/SimpleScreen";
import SimpleContainer from "../../components/simpleComponents/SimpleContainer";
import PrimaryCard from "../../components/designedComponents/PrimaryCard";
import { TextBold40 } from "../../components/specialComponents/text/AllTextKindFile";
import PrimaryInput from "../../components/designedComponents/PrimaryInput";
import PrimaryButton from "../../components/designedComponents/PrimaryButton";
import TertiaryButton from "../../components/designedComponents/TertiaryButton";
import SimpleImage from "../../components/simpleComponents/SimpleImage";
import { images } from "../../assets/images/images";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import { LoginScreenName } from "../login/Login";
import loginApi from "../../api/LoginApi";
import useHttpRequest from "../../hooks/useHttpRequest";

export const RegisterScreenName = '/RegisterScreen';
const APP_TITLE = 'Groomi'

export default function RegisterScreen() {
    const navigate = useNavigate()
    const { isSmallScreen } = useScreenSize();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const { performRequest: registerRequest, isPerforming } = useHttpRequest(loginApi.register, () => { navigate(LoginScreenName) });

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
                        title="Full Name"
                        value={fullName}
                        onChange={(text) => setFullName(text)}
                        style={{ marginTop: 24 }}
                    />

                    <PrimaryInput
                        type="text"
                        title="Username"
                        value={username}
                        onChange={(text) => setUsername(text)}
                        style={{ marginTop: 12 }}
                    />
                    <PrimaryInput
                        type="password"
                        title="Password"
                        value={password}
                        onChange={(text) => setPassword(text)}
                        style={{ marginTop: 12 }}
                    />

                    <SimpleContainer>
                        <PrimaryButton style={{ marginTop: 24 }} onClick={() => registerRequest(username, password, fullName)}>Register</PrimaryButton>

                        <TertiaryButton style={{ marginTop: 24, marginLeft: 8 }} onClick={() => navigate(LoginScreenName)}>Allready Registered?</TertiaryButton>
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