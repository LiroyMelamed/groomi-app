import SimpleImage from './SimpleImage';

export function SimpleIcon({ src, alt, size = 24, style, ...otherProps }) {

    const iconStyle = {
        width: size,
        height: size,
        ...style
    };

    return (
        <SimpleImage
            src={src}
            alt={alt}
            style={iconStyle}
            {...otherProps}
        />
    );
};

export default SimpleIcon;
