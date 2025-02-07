export default function SimpleContainer({ children, style, ...otherProps }) {
    return (
        <div
            style={style}
            {...otherProps}
        >
            {children}
        </div>
    );
}