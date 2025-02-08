import React, { useState } from "react";
import AppointmentDetailPopUp from "./AppointmentDetailPopUp";
import SimpleContainer from "../../../components/simpleComponents/SimpleContainer";
import PrimaryButton from "../../../components/designedComponents/PrimaryButton";
import { colors } from "../../../constant/colors";
import SimpleLoader from "../../../components/simpleComponents/SimpleLoader";

export default function GroomingQueueTable({ queue, handleDelete, handleUpdate, isPerforming }) {
    const [sortedBy, setSortedBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSort = (column) => {
        if (sortedBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortedBy(column);
            setSortOrder("asc");
        }
    };

    const sortedQueue = () => {
        if (!queue) return [];

        return [...queue].sort((a, b) => {
            const valueA = a[sortedBy];
            const valueB = b[sortedBy];

            if (sortedBy === "appointmentTime") {
                return sortOrder === "asc"
                    ? new Date(valueA) - new Date(valueB)
                    : new Date(valueB) - new Date(valueA);
            }

            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        });
    };

    const handleUpdateEntry = (updatedItem) => {
        handleUpdate(updatedItem.id, updatedItem);
        setSelectedItem(null);
    };

    if (isPerforming) {
        return <SimpleLoader />
    }

    return (
        <SimpleContainer style={{ padding: "20px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={styles.th} onClick={() => handleSort("customerName")}>
                            Name {sortedBy === "customerName" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th style={styles.th} onClick={() => handleSort("appointmentTime")}>
                            Appointment Time{" "}
                            {sortedBy === "appointmentTime" && (sortOrder === "asc" ? "↑" : "↓")}
                        </th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedQueue().map((entry) => (
                        <tr
                            key={entry.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedItem(entry)}
                        >
                            <td style={styles.td}>{entry.customerName}</td>
                            <td style={styles.td}>
                                {new Date(entry.appointmentTime).toLocaleString()}
                            </td>
                            <td style={styles.td}>
                                <PrimaryButton
                                    style={styles.deleteButton}
                                    onClick={(e) => {
                                        handleDelete(entry.id);
                                    }}
                                >
                                    Delete
                                </PrimaryButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AppointmentDetailPopUp
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                isOpen={selectedItem != null}
                onUpdate={handleUpdateEntry}
                onDelete={handleDelete}
            />
        </SimpleContainer>
    );
}

const styles = {
    th: {
        textAlign: "left",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    deleteButton: {
        padding: "5px 10px",
        color: "#fff",
        backgroundColor: "#ff4d4f",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        boxShadow: `0px 2px 6px ${colors.error}`,
    },
};
