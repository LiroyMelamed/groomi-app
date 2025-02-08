import React, { useEffect, useState } from "react";
import SimplePopup from "../../../components/simpleComponents/SimplePopup";
import PrimaryInput from "../../../components/designedComponents/PrimaryInput";
import SimpleContainer from "../../../components/simpleComponents/SimpleContainer";
import {
    TextBold12,
    TextBold20,
    TextBold32,
} from "../../../components/specialComponents/text/AllTextKindFile";
import SimpleTextArea from "../../../components/simpleComponents/SimpleTextArea";
import PrimaryButton from "../../../components/designedComponents/PrimaryButton";
import TertiaryButton from "../../../components/designedComponents/TertiaryButton";

export default function AppointmentDetailPopUp({
    item,
    isOpen,
    onClose,
    onUpdate,
    onDelete,
}) {
    const [appointmentTime, setAppointmentTime] = useState(item?.appointmentTime);
    const [description, setDescription] = useState(item?.description);

    useEffect(() => {
        if (item != null) {
            setAppointmentTime(item?.appointmentTime);
            setDescription(item?.description);
        }
    }, [item]);

    if (!item) return null;

    const handleUpdate = () => {
        const updatedItem = {
            ...item,
            appointmentTime,
            description,
        };
        onUpdate(updatedItem); // Call the parent update function
    };

    const handleDelete = () => {
        onDelete(item.id); // Call the parent delete function
    };

    return (
        <SimplePopup onClose={onClose} isOpen={isOpen}>
            <TextBold32>{`${item.customerName}'s Appointment Details`}</TextBold32>

            <SimpleContainer
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginTop: 24,
                }}
            >
                <TextBold20 style={{ flexShrink: 0, marginRight: 8 }}>
                    Appointment Time:
                </TextBold20>
                <PrimaryInput
                    type="datetime-local"
                    value={appointmentTime}
                    onChange={(text) => setAppointmentTime(text)}
                    style={{
                        flex: 1,
                    }}
                />
            </SimpleContainer>

            <SimpleTextArea
                title="Description"
                style={{ marginTop: 24 }}
                value={description}
                onChange={(text) => setDescription(text)}
            />

            <SimpleContainer
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginTop: 24,
                }}
            >
                <PrimaryButton onClick={handleUpdate}>Update</PrimaryButton>
                <TertiaryButton style={{ marginLeft: 8 }} onClick={handleDelete}>
                    Delete Appointment
                </TertiaryButton>
            </SimpleContainer>

            <SimpleContainer
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    marginTop: 24,
                }}
            >
                <TextBold12>Appointment Created At:</TextBold12>
                <TextBold12 style={{ marginLeft: 4 }}>
                    {`${new Date(item.createdAt).toLocaleString()}`}
                </TextBold12>
            </SimpleContainer>
        </SimplePopup>
    );
}
