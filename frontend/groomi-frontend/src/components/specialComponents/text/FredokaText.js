import React from "react";
import { colors } from "../../../constant/colors";
import SimpleText from "../../simpleComponents/SimpleText";

export default function FredokaText({
    color = colors.text,
    size = 14,
    fontFamily = 'Fredoka',
    fontWeight = 400,
    style,
    children,
    ...restProps
}) {
    const textStyle = {
        color,
        fontFamily,
        fontWeight,
        alignItems: 'flex-end',
        display: 'flex',
        ...style,
    };


    return (
        <SimpleText style={textStyle} size={size} {...restProps}>
            {children}
        </SimpleText>
    );
}
