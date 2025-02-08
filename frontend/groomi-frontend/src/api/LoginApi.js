import api from "./ApiUtils";

const loginApi = {
    login: async (username, password) => {
        const response = await api.post("/Auth/login", {
            username,
            passwordHash: password,
        });
        return response;
    },

    register: async (username, password, fullName) => {
        const userData = {
            username,
            passwordHash: password, // Fix: Send password as `passwordHash`
            fullName,
        }
        const response = await api.post("/Auth/register", userData);
        return response;
    },
};

export default loginApi;
