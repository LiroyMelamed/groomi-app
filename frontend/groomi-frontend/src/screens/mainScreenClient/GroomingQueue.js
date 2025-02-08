import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import SimpleLoader from "../../components/simpleComponents/SimpleLoader";
import Header from "../../components/designedComponents/Header";
import PrimaryInput from "../../components/designedComponents/PrimaryInput";
import TertiaryButton from "../../components/designedComponents/TertiaryButton";
import SimpleScreen from "../../components/simpleComponents/SimpleScreen";
import SimpleContainer from "../../components/simpleComponents/SimpleContainer";
import GroomingQueueTable from "./components/GroomingQueueTable";
import useAutoHttpRequest from "../../hooks/useAutoHttpRequest";
import useHttpRequest from "../../hooks/useHttpRequest";
import groomingQueueApi from "../../api/GroomingQueueApi";

export const GroomingQueueScreenName = "/GroomingQueueScreen";

export default function GroomingQueueScreen() {
    const [customerName, setCustomerName] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const { logout } = useAuth();

    // const { result: queue, isPerforming: isFetching, performRequest: fetchQueue } = useAutoHttpRequest(groomingQueueApi.getQueue);
    const { result: queue, isPerforming: isFetching, performRequest: fetchQueue } = useAutoHttpRequest(groomingQueueApi.getQueueStoredProcedure, { onSuccess: () => { } }); //StoredProcedure

    const { performRequest: addAppointment, isPerforming: isAdding } = useHttpRequest(
        groomingQueueApi.addEntry,
        fetchQueue
    );

    const { performRequest: deleteAppointment, isPerforming: isDeleting } = useHttpRequest(
        groomingQueueApi.deleteEntry,
        fetchQueue
    );

    const { performRequest: updateAppointment, isPerforming: isUpdating } = useHttpRequest(
        groomingQueueApi.updateEntry,
        fetchQueue
    );

    if (isFetching) return <SimpleLoader />;

    return (
        <SimpleScreen>
            <SimpleContainer style={{ flexDirection: "column", width: "100%" }}>
                <Header onLogout={logout} />

                <SimpleContainer style={{ display: "flex", flexDirection: "row", marginTop: 24 }}>
                    <PrimaryInput
                        type="text"
                        title="Customer Name"
                        value={customerName}
                        onChange={setCustomerName}
                        style={{ flex: 1 }}
                    />
                    <PrimaryInput
                        type="datetime-local"
                        value={appointmentTime}
                        onChange={setAppointmentTime}
                        style={{ flex: 1 }}
                    />
                    <TertiaryButton onClick={() => addAppointment({ customerName, appointmentTime })} size="small" disabled={isAdding}>
                        {isAdding ? "Adding..." : "Add to Queue"}
                    </TertiaryButton>
                </SimpleContainer>

                <GroomingQueueTable
                    queue={queue}
                    handleDelete={deleteAppointment}
                    handleUpdate={updateAppointment}
                    isPerforming={isDeleting || isAdding || isUpdating}
                />
            </SimpleContainer>
        </SimpleScreen>
    );
}
