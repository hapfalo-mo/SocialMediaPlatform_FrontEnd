
import axios from "axios";
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

//  Create New Post 
export const creatNewPost = async (userId, title, body, imgUrl) => {
    try {
        const data = {
            userId: userId,
            title: title,
            body: body,
            imgUrl: imgUrl
        };
        try {
            const response = await axios.post("https://localhost:7118/api/Post/create-post", data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.log("Create Post Fail:", error);
            throw error;
        }
    } catch (error) {
        console.log("Create Post Fail:", error);
        throw error;
    }
}

// Get All Post
export const getAllPost = async () => {
    try {
        const response = await api.get('https://localhost:7118/api/Post/get-all-post');
        return response.data;
    } catch (error) {
        console.log("Get All Post Fail:", error);
        throw error;
    }
}