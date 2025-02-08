import React from "react";
import SimpleButton from "../simpleComponents/SimpleButton";
import SimpleImage from "../simpleComponents/SimpleImage";
import { colors } from "../../constant/colors";

export default function PrimaryButton({
    children,
    onClick,
    disabled = false,
    style = {},
    size = "medium", // small, medium, or large
    leftIcon,
    rightIcon,
}) {
    const buttonStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: size === "small" ? "8px" : size === "large" ? "16px" : "12px",
        borderRadius: "8px",
        backgroundColor: disabled ? colors.disabled : colors.primary,
        color: disabled ? colors.disabledText : colors.secondary,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        boxShadow: disabled ? "none" : `0px 2px 6px ${colors.primaryHighlighted}`,
        transition: "background-color 0.2s ease",
        ...style,
    };

    const iconStyle = {
        margin: "0 8px",
        display: "inline-block",
    };

    return (
        <SimpleButton
            style={buttonStyles}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
        >
            {leftIcon && <SimpleImage src={leftIcon} alt="left icon" style={iconStyle} />}
            {children}
            {rightIcon && <SimpleImage src={rightIcon} alt="right icon" style={iconStyle} />}
        </SimpleButton>
    );
}
