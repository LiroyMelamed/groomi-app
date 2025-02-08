import SimpleContainer from "./SimpleContainer";

export default function SimpleScreen({ backgroundImageSrc, children, style, otherProps }) {

    const screenStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxSizing: 'border-box',
        ...style
    }

    const contentContainerStyle = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        padding: '8px 12px',
        flexDirection: 'column'
    };

    return (
        <SimpleContainer
            style={screenStyle}
            {...otherProps}
        >
            <SimpleContainer style={contentContainerStyle}>
                {children}
            </SimpleContainer>
        </SimpleContainer>
    );
}