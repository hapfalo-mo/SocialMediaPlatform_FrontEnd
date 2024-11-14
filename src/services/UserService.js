
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

// Signup Function 
export const signup = async (data) => {
    try {
        const response = await axios.post("https://localhost:7118/api/User/create-user", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.log("Signup Fail:", error);
        throw error;
    }
}
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
};

// Get All User 
export const getAllUser = async (id) => {
    try {
        const response = await api.get(`https://localhost:7118/api/User/get-all-user/${id}`);
        return response.data;
    } catch (error) {
        console.log("Get All User Fail:", error);
        throw error;
    }
};
// Like Action Post 
export const LikeAction = async (postId, userId) => {
    try {
        const response = await api.post(`https://localhost:7118/api/LikeAction/like-post/${postId}/${userId}`);
        return response;
    } catch (error) {
        console.log("Like Action Fail:", error);
        throw error;
    }
};

// check Like Or UnLike Post 
export const checkLikeAction = async (postId, userId) => {
    try {
        const response = await api.get(`https://localhost:7118/api/Post/check-like-post/${postId}/${userId}`);
        return response;
    } catch (err) {
        console.log("Check Like Action Fail:", err);
        throw err;
    }
};

// Get User By User Id 
export const getUserById = async (id) => {
    try {
        const response = await api.get(`https://localhost:7118/api/User/get-user-by-id/${id}`);
        return response;
    } catch (error) {
        console.log("Get User By Id Fail:", error);
        throw error;
    }
};

// Get All Unregistered Favorite 
export const getAllUnregisteredFavorite = async (registeredId) => {
    try {
        const response = await api.get(`https://localhost:7118/api/Favorite/get-all-favorite-except/${registeredId}`);
        return response.data
    } catch (err) {
        console.log("Get All Unregistered Favorite Fail:", err);
        throw err;
    }
};

// Save Registered favorite By User
export const saveRegisteredFavor = async (userId, favoriteIds) => {
    try {
        const response = await api.post(`https://localhost:7118/api/Favorite/add-favorite-by-list/`, favoriteIds,
            {
                params: { userid: userId },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response;
    } catch (err) {
        console.log("Save Registered Favorite Fail:", err);
        throw err;
    }
};

// Get All Registered Favorite By User 
export const getAllRegisteredFavorite = async (userId) => {
    try {
        const response = await api.get(`https://localhost:7118/api/Favorite/get-all-user-favorite/${userId}`);
        return response.data;
    } catch (err) {
        console.log("Get All Registered Favorite Fail:", err);
        throw err;
    }
}

// Follow User 
export const followUser = async (followerId, followedId) => {
    try {
        const response = await api.post(`https://localhost:7118/api/FollowAction/follow-action/${followerId}/${followedId}`);
        return response;
    } catch (err) {
        console.log("Follow User Fail:", err);
        throw err;
    }
}

// Check Follow User
export const checkFollowUser = async (followerId, followedId) => {
    try {
        const response = await api.get(`https://localhost:7118/api/FollowAction/check-followed/${followerId}/${followedId}`);
        return response;
    } catch (err) {
        console.log("Check Follow User Fail:", err);
        throw err;
    }
}

// Get Comment By CommentId 
export const getCommentByPostId = async (postId) => {
    try {
        const response = await api.get(`https://localhost:7118/api/Comment/get-comment-by-postId?postId=${postId}`);
        return response;
    } catch (err) {
        console.log("Get Comment By CommentId Fail:", err);
        throw err;
    }
}

// create Comment 
export const createComment = async (data) => {
    try {
        const response = await api.post(`https://localhost:7118/api/Comment/create-comment`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (err) {
        console.log("Create Comment Fail:", err);
        throw err;
    }
};

// Check Register Favorite 
export const checkRegisterFavorite = async (userId) => {
    try {
        const response = await api.get(`https://localhost:7118/api/User/check-user-have-favorite/${userId}`);
        return response;
    } catch (err) {
        console.log("Check Register Favorite Fail:", err);
        throw err;
    }
};

// Get All Favorite List 
export const getAllFavorites = async () => {
    try {
        const response = await api.get(`https://localhost:7118/api/Favorite/get-all-favorite`);
        return response;
    } catch (err) {
        console.log("Get All Favorite Fail:", err);
        throw err;
    }
}