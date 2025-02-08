import React from "react";
import SimpleButton from "../simpleComponents/SimpleButton";
import SimpleImage from "../simpleComponents/SimpleImage";
import { colors } from "../../constant/colors";

export default function TertiaryButton({
    children,
    onClick,
    disabled = false,
    style = {},
    size = "medium",
    leftIcon,
    rightIcon,
    innerTextColor,
}) {
    const buttonStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: size === "small" ? "8px" : size === "large" ? "16px" : "12px",
        borderRadius: "8px",
        backgroundColor: disabled ? colors.transparent : colors.transparent,
        color: disabled
            ? colors.disabledHighlighted
            : innerTextColor || colors.primaryHighlighted,
        cursor: disabled ? "not-allowed" : "pointer",
        border: `1px solid ${disabled ? colors.disabledHighlighted : colors.primaryHighlighted
            }`,
        transition: "all 0.2s ease",
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
            onMouseDown={(e) => {
                if (!disabled) e.target.style.color = colors.secondaryHighlighted;
            }}
            onMouseUp={(e) => {
                if (!disabled) e.target.style.color = innerTextColor || colors.primaryHighlighted;
            }}
        >
            {leftIcon && <SimpleImage src={leftIcon} alt="left icon" style={iconStyle} />}
            {children}
            {rightIcon && <SimpleImage src={rightIcon} alt="right icon" style={iconStyle} />}
        </SimpleButton>
    );
}
