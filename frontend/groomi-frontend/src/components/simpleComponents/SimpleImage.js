export default function SimpleImage({ src, style, resizeMode = 'contain', ...otherProps }) {
    const imageStyle = {
        ...style,
        objectFit: resizeMode,
        display: 'block',
        userSelect: 'none',
        pointerEvents: 'none',
    };

    return (
        <img
            src={src?.uri || src}
            style={imageStyle}
            alt="SimpleImage"
            {...otherProps}
        />
    );
}