import React from "react";
import { Text40 } from "../specialComponents/text/AllTextKindFile";
import SimpleButton from "../simpleComponents/SimpleButton";
import SimpleLoader from "../simpleComponents/SimpleLoader";
import TertiaryButton from "./TertiaryButton";
import PrimaryButton from "./PrimaryButton";
import { colors } from "../../constant/colors";

export default function Header({ title = "Groomi", onLogout, isPerformingLogOut }) {
    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    };

    const buttonStyle = {
        backgroundColor: "#ff4d4f",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        boxShadow: `0px 2px 6px ${colors.error}`,
    };

    return (
        <header style={headerStyle}>
            <Text40>{title}</Text40>
            <PrimaryButton
                onClick={onLogout}
                style={buttonStyle}
            >
                {isPerformingLogOut ? <SimpleLoader /> : "Logout"}
            </PrimaryButton>
        </header>
    );
}
