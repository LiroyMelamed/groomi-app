import SimpleCard from "../simpleComponents/SimpleCard";

export default function PrimaryCard({ children, style }) {
    const cardStyle = {
        display: 'flex',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'white',
        width: '100%',
        minHeight: '12px',
        ...style
    };

    return (
        <SimpleCard
            style={cardStyle}
        >
            {children}
        </SimpleCard>
    );
}