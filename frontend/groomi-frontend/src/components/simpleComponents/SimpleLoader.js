import React from 'react';
import SimpleContainer from './SimpleContainer';
import { colors } from '../../constant/colors';

const SimpleLoader = ({ style }) => {
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: colors.transparent,
        top: 0,
        left: 0,
        zIndex: 1000,
        ...style
    };

    const dotStyle = {
        width: 8,
        height: 8,
        backgroundColor: colors.text,
        borderRadius: '50%',
        margin: '0 5px',
        opacity: 0,
        animation: 'dotPulse 1.5s infinite ease-in-out',
    };

    const keyframes = `
        @keyframes dotPulse {
            0%, 80%, 100% {
                opacity: 0;
            }
            40% {
                opacity: 1;
            }
        }
    `;

    return (
        <>
            <style>{keyframes}</style>
            <SimpleContainer style={loaderStyle}>
                <SimpleContainer style={{ ...dotStyle, animationDelay: '0s' }} />
                <SimpleContainer style={{ ...dotStyle, animationDelay: '0.3s' }} />
                <SimpleContainer style={{ ...dotStyle, animationDelay: '0.6s' }} />
            </SimpleContainer>
        </>
    );
};

export default SimpleLoader;
