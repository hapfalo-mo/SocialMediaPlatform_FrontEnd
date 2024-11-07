
import api from "./Axios"
// Login Function 
export const login = async ({ username, password }) => {
    try {
        const response = await api.post('User/login', null, {
            params: {
                username: username,
                password: password
            },
        });

        return response.data;
    } catch (error) {
        console.log("Login Fail:", error);
        throw error;
    }
};