import api from "./ApiUtils";

const groomingQueueApi = {
    getQueue: async () => {
        const response = await api.get("/GroomingQueue");
        return response;
    },

    addEntry: async (entry) => {
        const response = await api.post("/GroomingQueue", entry);
        return response;
    },

    updateEntry: async (id, updatedEntry) => {
        const response = await api.put(`/GroomingQueue/${id}`, updatedEntry);
        return response;
    },

    deleteEntry: async (id) => {
        const response = await api.delete(`/GroomingQueue/${id}`);
        console.log('response', response);

        return response;
    },
};

export default groomingQueueApi;
