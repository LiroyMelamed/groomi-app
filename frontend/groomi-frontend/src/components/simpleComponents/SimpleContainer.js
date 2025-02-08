export default function SimpleContainer({ children, style, ...otherProps }) {
    return (
        <div
            style={{ ...style, boxSizing: 'border-box', display: 'flex' }}
            {...otherProps}
        >
            {children}
        </div>
    );
}