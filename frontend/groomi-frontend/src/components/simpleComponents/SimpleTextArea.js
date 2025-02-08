import React, { useState } from "react";
import SimpleContainer from "./SimpleContainer";
import SimpleIcon from "./SimpleIcon";
import { colors } from "../../constant/colors";

export default function SimpleTextArea({
    title,
    leftIcon,
    rightIcon,
    tintColor,
    style,
    textStyle,
    value,
    onChange,
    disabled = false,
    error = "",
    ...props
}) {
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = disabled
        ? colors.disabledHighlighted
        : error
            ? colors.error
            : isFocused
                ? colors.primaryHighlighted
                : colors.secondaryHighlighted;

    const backgroundColor = disabled ? colors.disabled : colors.white;

    return (
        <SimpleContainer
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                border: `1px solid ${borderColor}`,
                backgroundColor,
                borderRadius: 12,
                padding: "12px",
                boxShadow: isFocused ? "0 0 4px rgba(0, 0, 0, 0.2)" : "none",
                width: "100%",
                direction: "ltr",
                ...style,
            }}
        >
            {title && (
                <span
                    style={{
                        position: "absolute",
                        top: isFocused || value ? "-10px" : "12px",
                        left: "15px",
                        fontSize: isFocused || value ? "12px" : "16px",
                        color: error ? colors.error : colors.primaryHighlighted,
                        backgroundColor: colors.white,
                        padding: "0 5px",
                        transition: "all 0.2s ease",
                        pointerEvents: "none",
                    }}
                >
                    {title}
                </span>
            )}

            {leftIcon && (
                <SimpleIcon
                    tintColor={tintColor || borderColor}
                    src={leftIcon}
                    style={{ marginRight: "8px" }}
                />
            )}

            <textarea
                style={{
                    flex: 1,
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                    fontSize: "14px",
                    fontFamily: "Fredoka",
                    color: disabled ? colors.disabledText : colors.text,
                    textAlign: "left",
                    direction: "ltr",
                    resize: "none",
                    ...textStyle,
                }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                {...props}
            />

            {rightIcon && (
                <SimpleIcon
                    tintColor={tintColor || borderColor}
                    src={rightIcon}
                    style={{ marginLeft: "8px" }}
                />
            )}
        </SimpleContainer>
    );
}
