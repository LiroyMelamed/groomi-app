import React from "react";
import SimpleContainer from "./SimpleContainer";
import SimpleButton from "./SimpleButton";
import { colors } from "../../constant/colors";

export default function SimplePopup({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <>
            <SimpleContainer style={styles.modalOverlay} onClick={onClose}></SimpleContainer>
            <SimpleContainer style={styles.modal}>
                <SimpleButton style={styles.closeButton} onClick={onClose}>
                    X
                </SimpleButton>
                {children}
            </SimpleContainer>
        </>
    );
}

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: colors.halfTransparentBlack,
        zIndex: 999,
    },
    modal: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        minWidth: "200px",
        maxWidth: "100%",
        flexDirection: "column",
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: colors.transparent,
        border: "none",
        cursor: "pointer",
    },
};
