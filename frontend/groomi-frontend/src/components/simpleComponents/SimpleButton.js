export default function SimpleButton({ children, style, onClick, otherProps }) {
    return (
        <button
            style={style}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </button>
    );
}