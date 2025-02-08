import React from 'react';
import { colors } from '../../constant/colors';

export default function SimpleText({ size = 16, color = colors.text, children, style, ...props }) {
    return (
        <p
            style={{
                fontSize: `${size}px`,
                color,
                margin: 0,
                direction: 'ltr',
                textAlign: 'left',
                ...style
            }}
            {...props}
        >
            {children}
        </p>
    );
};

