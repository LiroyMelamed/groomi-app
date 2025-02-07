import SimpleContainer from "./SimpleContainer";

export default function SimpleCard({ children, style }) {
    const cardStyle = {
        padding: '8px 12px',
        ...style
    }

    return (
        <SimpleContainer
            style={cardStyle}
        >
            {children}
        </SimpleContainer>
    );
}