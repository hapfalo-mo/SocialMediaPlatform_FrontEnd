import React, { useEffect, useState } from "react";
import imgCol1 from "../assets/homepagecolumn1.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { storage, firestore, app } from "../configs/firebase";
import * as api from "../services/UserService";
import { ref, uploadBytesResumable, getStorage, getDownloadURL } from "firebase/storage";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    // Post Modal Feature 
    const [postTile, setPostTile] = useState('');
    const [body, setBody] = useState('');
    const [isPostCreating, setIsPostCreating] = useState(false);
    const [postList, setPostList] = useState([]);
    const [hintFriendList, setHintFriendList] = useState([]);
    const [checkPostLiked, setCheckPostLiked] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);
    const [isFavoriteSelectionModalOpen, setIsFavoriteSelectionModalOpen] = useState(false);
    const [FavoriteList, setFavoriteList] = useState([]);
    const [selectedFavorites, setSelectedFavorites] = useState([]);
    const [registeredFavoriteList, setRegisteredFavoriteList] = useState([]);
    const [avatarHoverStatus, setAvatarHoverStatus] = useState(null);
    const [hoveredUserData, setHoveredUserData] = useState(null);
    const [followedStatus, setFollowedStatus] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [isResponseSite, setIsResponseSite] = useState(false);
    const [replyTo, setReplyTo] = useState('');
    const [commentText, setCommentText] = useState('');
    const [ParrentId, setParrentId] = useState(null);
    const [isCommentMutal, setIsCommentMutal] = useState({});
    // Handle Image Change
    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            setImagePreview(e.target.files[0]);
        }
    }
    const handleUploadImage = async () => {
        if (imagePreview) {
            return new Promise((resolve, reject) => {
                const storageRef = ref(storage, `images/${imagePreview.name}`);
                const uploadTask = uploadBytesResumable(storageRef, imagePreview);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    },
                    (error) => {
                        reject(error);
                    },
                    async () => {
                        try {
                            const url = await getDownloadURL(storageRef);
                            console.log("Uploaded image URL:", url);
                            resolve(url); // Resolve with the URL
                        } catch (error) {
                            console.error("Failed to get URL:", error);
                            reject(error);
                        }
                    }
                );
            });
        } else {
            throw new Error("No image selected");
        }
    };
    // Create Post 
    const createPost = async () => {
        try {
            setIsPostCreating(true);
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const userId = decoded?.UsereId;
            const imgUrl = await handleUploadImage();
            const response = api.creatNewPost(userId, postTile, body, imgUrl);
            if (response) {
                toast.success("Tạo bài đăng thành công");
                console.log("Create Post Success");
            }
        } catch (error) {
            console.error("Create Post Fail");
            console.log(error);
        } finally {
            setIsPostCreating(false);
            setIsPostModalOpen(false);
        }
    }
    // Get All Post 
    const getAllPost = async () => {
        try {
            const response = await api.getAllPost();
            if (response) {
                console.log(response?.postResponseDTO.value);
                setPostList(response?.postResponseDTO.value);
            }
        } catch (error) {
            console.error("Get All Post Fail");
            console.log(error);
        }
    }
    // Get All User
    const getAllUser = async () => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const userId = decoded?.UsereId;
            const response = await api.getAllUser(userId);
            if (response) {
                console.log(response?.value);
                setHintFriendList(response?.value);
            }
        } catch (error) {
            console.error("Get All User Fail");
            console.log(error);
        }
    }
    // Check Post Like 
    const checkPostLike = async (postId) => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const userId = decoded?.UserId;
            const response = await api.checkLikeAction(postId, userId);

            if (response?.value === "true") {
                setCheckPostLiked((prevLikedPosts) => ({
                    ...prevLikedPosts,
                    [postId]: true,
                }));
            } else {
                setCheckPostLiked((prevLikedPosts) => ({
                    ...prevLikedPosts,
                    [postId]: false,
                }));
            }
        } catch (error) {
            console.error("Check Post Like Fail", error);
        }
    };
    // Hanle Like Action 
    const handleLikeAction = async (postId) => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const userId = decoded?.UsereId;
            const response = await api.LikeAction(postId, userId);
            if (response) {
                setCheckPostLiked((prevLikedPosts) => ({
                    ...prevLikedPosts,
                    [postId]: !prevLikedPosts[postId],
                }));
                getAllPost();
            }
        } catch (Err) {
            console.log(Err)
        }
    }
    // Get UnRegistered Favorite
    const getUnRegisteredFavorite = async (userId) => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const userId = decoded?.UsereId;
            const response = await api.getAllUnregisteredFavorite(userId);
            if (response) {
                console.log("Get UnRegistered Favorite Success:", response);
                console.log(response?.value);
                setFavoriteList(response?.value);
            }
        } catch (error) {
            console.log("Get UnRegistered Favorite Fail:", error);
            throw error;
        }
    }
    // Get Registered Favorite
    const getRegisteredFavorite = async (userId) => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const userId = decoded?.UsereId;
            const response = await api.getAllRegisteredFavorite(userId);
            if (response) {
                console.log("Get Registered Favorite Success:", response);
                console.log(response?.value);
                setRegisteredFavoriteList(response?.value);
            }
        } catch (error) {
            console.log("Get Registered Favorite Fail:", error);
            throw error;
        }
    }
    // HandleGetFriendInforByHover 
    const handleMouseEnter = async (friend) => {
        setAvatarHoverStatus(friend.userId);
        try {
            const response = await api.getUserById(friend.userId);
            setHoveredUserData(response?.data.value);
        } catch (error) {
            console.error("Get User By ID Fail", error);
        }
    }
    const fetchUser = async () => {
        const tokenPath = localStorage.getItem("token");
        if (!tokenPath) {
            setCurrentUser(null);
            return;
        }
        const decoded = jwtDecode(tokenPath);
        const userId = decoded?.UsereId;
        if (userId) {
            try {
                const response = await api.getUserById(userId);
                if (response) {
                    console.log("User fetched:", response);
                    setCurrentUser(response?.data.value);
                }
            } catch (error) {
                console.error("Get User By ID failed", error);
            }
        } else {
            setCurrentUser(null);
        }
    };
    // Get All Comment By Post Id 
    const getAllCommentByPostId = async (postId) => {
        try {
            const response = await api.getCommentByPostId(postId);
            if (response) {
                console.log("Get All Comment By Post Id Success:", response);
                console.log(response?.data);
            }
            return response?.data;
        } catch (error) {
            console.log("Get All Comment By Post Id Fail:", error);
            throw error;
        }
    }
    //  Get Comment By For Each Post Id 
    const fetchCommentForEachPost = async () => {
        try {
            const commentData = await Promise.all(
                postList.map(async (post) => {
                    const response = await getAllCommentByPostId(post.postId);
                    return { postId: post.postId, comments: response || [] };
                })
            );
            // Create Object with Post ID as key and comments as value
            const commentMap = commentData.reduce((acc, { postId, comments }) => {
                acc[postId] = comments;
                return acc;
            }, {});
            setCommentList(commentMap);
            console.log("Comment List:", commentList);
        } catch (error) {
            console.error("Fetch Comment For Each Post Fail", error);
        }
    }

    // Create Comment 
    const createComment = async (content, createBy, postId, ParrentId) => {
        try {
            const data = {
                content: content,
                createBy: createBy,
                postId: postId,
                ParrentId: ParrentId
            };
            const response = await api.createComment(data);
            if (response) {
                console.log("Create Comment Success:", response);
                setParrentId(null);
                setReplyTo(null);
                setCommentText('');
                getAllPost();
            }
        }
        catch (error) {
            console.log("Create Comment Fail:", error);
        }
    }
    useEffect(() => {
        if (postList.length > 0) {
            fetchCommentForEachPost();
        }
    }, [postList]);
    useEffect(() => {
        console.log("Updated Comment List:", commentList);
    }, [commentList]);

    useEffect(() => {
        fetchUser();
        const handleStoreChange = (event) => {
            if (event.key === "token") {
                fetchUser();
            }
        };
        window.addEventListener("storage", handleStoreChange);
        window.addEventListener("userUpdated", fetchUser);

        return () => {
            window.removeEventListener("storage", handleStoreChange);
            window.addEventListener("userUpdated", fetchUser);
        };
    }, []);

    useEffect(() => {
        getAllPost();
    }, []);

    useEffect(() => {
        getAllUser();
    }, []);

    useEffect(() => {
        getUnRegisteredFavorite();
    }, []);

    useEffect(() => {
        getRegisteredFavorite();
    }, []);

    useEffect(() => {
        const fetchAllLikes = async () => {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            console.log(decoded);
            const userId = decoded?.UsereId;
            console.log(userId);
            const likedStatuses = {};
            for (const post of postList) {
                try {
                    const response = await api.checkLikeAction(post?.postId, userId);
                    console.log(response?.data);
                    likedStatuses[post.postId] = response?.data === true;
                    console.log(`Post ID: ${post.postId}, Liked: ${likedStatuses[post.postId]}`);
                } catch (error) {
                    console.error(`Failed to check like for post ${post?.postId}`, error);
                    likedStatuses[post.postId] = false;
                }
            }
            setCheckPostLiked(likedStatuses);
        };
        if (postList.length > 0) {
            fetchAllLikes();
        }
    }, [postList]);
    // Resolve time 
    const changeTimeType = (time) => {
        const saveTime = new Date(time); // Convert the saved time to a Date object
        const currentTime = new Date(); // Get the current time

        // Calculate the difference in milliseconds
        const diffInMilliseconds = currentTime - saveTime;

        // Calculate time differences in various units
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);
        const formatter = new Intl.RelativeTimeFormat('vi', { numeric: "auto" });
        if (diffInSeconds < 60) {
            return formatter.format(-diffInSeconds, 'seconds');
        } else if (diffInMinutes < 60) {
            return formatter.format(-diffInMinutes, 'minutes');
        } else if (diffInHours < 24) {
            return formatter.format(-diffInHours, 'hours');
        } else if (diffInDays < 7) {
            return formatter.format(-diffInDays, 'days');
        } else if (diffInWeeks < 4) {
            return formatter.format(-diffInWeeks, 'weeks');
        } else if (diffInMonths < 12) {
            return formatter.format(-diffInMonths, 'months');
        } else {
            return formatter.format(-diffInYears, 'years');
        }
    };

    // Toggle selected state for a favorite
    const toggleFavorite = (favoriteId) => {
        setSelectedFavorites((prevSelected) =>
            prevSelected.includes(favoriteId)
                ? prevSelected.filter((id) => id !== favoriteId)
                : [...prevSelected, favoriteId]
        );
    };
    // Togggle Comment By PostId 
    const toggleComment = (postId) => {
        setIsCommentMutal((prevStatus) => ({
            ...prevStatus,
            [postId]: !prevStatus[postId]
        }));
    };
    // Save Favorite Of User 
    const saveFavoriteOfUser = async () => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const userId = decoded?.UsereId;
            const response = await api.saveRegisteredFavor(userId, selectedFavorites);
            if (response.status === 201) {
                console.log("Save Favorite Of User Success", response);
                setIsFavoriteSelectionModalOpen(false);
                getRegisteredFavorite();
            } else {
                console.log("Save Favorite Of User Fail", response);
            }
        } catch (error) {
            console.error("Save Favorite Of User Fail", error);
        }
    }
    // Follow User
    const followUserAction = async (userId) => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const currentUserId = decoded?.UsereId;
            const isCurrentFollowStatus = followedStatus[userId];
            const response = await api.followUser(currentUserId, userId);
            if (response?.status === 200) {
                setFollowedStatus((prevStatus) => ({ ...prevStatus, [userId]: !isCurrentFollowStatus }));
                fetchUser();
            }
        } catch (error) {
            console.error("Follow User Fail", error);
        }
    }
    // Check Followed User 
    const checkFollowedUser = async (userId) => {
        try {
            const tokenPath = localStorage.getItem("token");
            const decoded = jwtDecode(tokenPath);
            const currentUserId = decoded?.UsereId;
            const response = await api.checkFollowUser(currentUserId, userId);
            console.log("Status Followed:", response?.status);
            if (response?.status === 200) {
                setFollowedStatus((prevStatus) => ({ ...prevStatus, [userId]: true }));
            } else {
                setFollowedStatus((prevStatus) => ({ ...prevStatus, [userId]: false }));
            }
        } catch (error) {
            console.error("Check Followed User Fail", error);
        }
    }
    // Check 
    useEffect(() => {
        for (const friend of hintFriendList) {
            checkFollowedUser(friend.userId);
        }
    }, [hintFriendList]);

    // Function to handle reply click
    const handleReplyClick = (userName, postId) => {
        setParrentId(postId);
        setReplyTo(userName);
        setCommentText(`@${userName}`);
    };

    //  Render Comments 
    const renderComments = (comments, level = 0) => {
        console.log("Rendering level:", level, "with comments:", comments);
        return comments.map((comment) => (
            <div key={comment.commentId} style={{ marginLeft: level * 20 + 'px' }} className="w-full flex flex-col gap-3">
                {/* Each comment */}
                <div className="flex gap-3">
                    <img src={comment.userAvatar} alt="" className="h-12 w-12 rounded-full" />
                    <div className="w-[90%] flex flex-col items-start">
                        <p className="font-bold">{comment.userName}</p>
                        <p>{comment.content}</p>
                        {/* Action Reply + Time */}
                        <div className="flex gap-5 text-baseText">
                            <span>{changeTimeType(comment?.createAt)}</span>
                            <span
                                onClick={() => handleReplyClick(comment?.userName, comment?.commentId)}
                                className="cursor-pointer hover:text-black hover:font-bold">Trả lời</span>
                        </div>
                    </div>
                </div>
                {/* Render các bình luận con nếu có */}
                {comment.subComments && comment.subComments.length > 0 && (
                    <div className="pl-5">
                        {renderComments(comment.subComments, level + 1)}
                    </div>
                )}
            </div>
        ));
    }

    // Logout Function 
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div className="flex w-full h-screen gap-6">
            {/* Column 1 content */}
            {currentUser && (
                <div className="w-[25%] p-4 bg-white max-h-[95vh] sticky top-0 rounded-xl">
                    <div className="w-full">
                        <div className=" w-full flex flex-col items-center justify-center gap-8">
                            <img src={currentUser?.avatarUrl} alt="User Avatar" className="w-32 h-32 rounded-full" />
                            <h1 className="text-2xl font-bold text-baseText">@{currentUser?.username}
                                <span className="pl-2">
                                    {currentUser?.gentle === 0 && <i className="fa-solid fa-mars text-blue-600"></i>}
                                    {currentUser?.gentle === 1 && <i className="fa-solid fa-venus text-pink-600"></i>}
                                    {currentUser?.gentle === 2 && <i className="fa-solid fa-genderless text-gray-600"></i>}
                                </span>
                            </h1>
                            {/* Favorite site */}
                            <div className=" w-full flex">
                                <dl className="w-full flex items-center justify-center gap-10">
                                    <div className=" w-[40%] flex flex-col justify-center items-center gap-2">
                                        <dt className="text-2xl font-bold text-blue-700">{currentUser?.followedCount}</dt>
                                        <dd className="text-sm text-baseText">Người theo dõi</dd>
                                    </div>
                                    <div className=" w-[35%] flex flex-col justify-center items-center gap-2">
                                        <dt className="text-2xl font-bold text-blue-700">{currentUser?.followingCount}</dt>
                                        <dd className="text-sm text-baseText">Đang theo dõi</dd>
                                    </div>
                                    <div className=" w-[25%] flex flex-col justify-center items-center gap-2">
                                        <dt className="text-2xl font-bold text-blue-700">{currentUser?.postCount}</dt>
                                        <dd className="text-sm text-baseText">Bài đăng</dd>
                                    </div>
                                </dl>
                            </div>
                            {/* Favorite Site */}
                            <div className="flex flex-col w-full gap-5 h-auto mt-3">
                                <div className="flex w-full items-center justify-between">
                                    <h1 className="text-xl font-bold flex text-black-200">Sở thích</h1>
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setIsFavoriteModalOpen(true)}>
                                        <i className="cursor-pointer fas fa-ellipsis-h text-black-700 mr-2" />
                                        {isFavoriteModalOpen && (
                                            <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-lg z-10"
                                                onMouseEnter={() => setIsFavoriteModalOpen(true)}
                                                onMouseLeave={() => setIsFavoriteModalOpen(false)}>
                                                <div
                                                    onClick={() => setIsFavoriteSelectionModalOpen(true)}
                                                    className="w-full flex items-center justify-evenly p-3 gap-2 cursor-pointer text-baseText hover:text-blue-600 hover:bg-gray-300 hover:bg-opacity-20">
                                                    <span>
                                                        <i className="fas fa-plus"></i>
                                                    </span>
                                                    <h4 className="text-sm">Thêm mới sở thích</h4>
                                                </div>
                                                <div className="w-full flex items-center justify-evenly p-3 gap-2 cursor-pointer  text-baseText hover:text-blue-600 hover:bg-gray-300 hover:bg-opacity-20">
                                                    <span>
                                                        <i className="fas fa-cog"></i>
                                                    </span>
                                                    <h4 className="text-sm">Quản lí sở thích</h4>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <ul className=" flex flex-wrap gap-2 *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-blue-300 *:text-blue-400 dark:*:border-sky-500/15 dark:*:bg-sky-500/10">
                                        {registeredFavoriteList?.map((favorite) => (
                                            <li key={favorite?.favoriteId} className="flex items-center gap-2">
                                                <span>{favorite?.favoriteName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Create New Porfolio */}
                            <div className="flex flex-col w-full gap-5 h-auto mt-3">
                                <div className="flex w-full items-center justify-between">
                                    <h1 className="text-xl font-bold flex text-black-200">Bài đăng</h1>
                                    <i className="fas fa-ellipsis-h text-black-700 mr-2"></i>
                                </div>
                                <div className="px-5">
                                    <img src={imgCol1} alt="" className="w-full h-60 bg-blue-600 rounded-2xl" />
                                </div>
                            </div>
                            <button onClick={setIsPostModalOpen} className="relative inline-flex items-center justify-center mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 p-0 border border-blue-600">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 group-hover:text-white text-blue-600 font-bold">
                                    <i className="fas fa-plus mr-2"></i>
                                    Thêm bài đăng
                                </span>
                            </button>
                            {/* Post Create Form */}
                        </div>
                    </div>
                </div>
            )}
            {/* Column 2 content */}
            <div className="w-[50%] h-auto p-4 bg-white rounded-xl bg-[#f7f7f7]">
                <div className="flex flex-col gap-5 mt-3 items-start">
                    <h1 className="text-black font-bold text-xl">Bạn có thể quan tâm</h1>
                    {/* Hint Friend Site */}
                    <div className="w-full flex gap-8 pb-10 border-b border-gray-300">
                        {hintFriendList?.map((friend) => (
                            <div
                                key={friend?.userId}
                                onMouseEnter={() => handleMouseEnter(friend)}
                                className="relative flex flex-col items-center gap-2 cursor-pointer"
                            >
                                <div
                                    className={`w-16 h-16 rounded-full p-[2px] ${friend?.gentle === 0
                                        ? 'border-2 border-blue-400'
                                        : friend?.gentle === 1
                                            ? 'border-2 border-pink-400'
                                            : 'border-gradient'
                                        }`}
                                >
                                    <img
                                        src={friend?.avatarUrl}
                                        alt="User Avatar"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h1 className="text-baseText font-bold">{friend?.username}</h1>
                                {avatarHoverStatus === friend?.userId && (
                                    <div
                                        style={{ zIndex: 9999 }}
                                        onMouseLeave={() => setAvatarHoverStatus(null)}
                                        className="absolute top-full mt-2 w-95 h-auto z-10 bg-white p-2 shadow-2xl rounded-xl">
                                        <div className="w-full flex justify-between px-5 items-center">
                                            <img src={hoveredUserData?.avatarUrl} alt="" className="h-16 w-16 rounded-full" />
                                            {followedStatus[friend?.userId] ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => followUserAction(friend?.userId)}
                                                        className="bg-blue-600 p-2 rounded-xl text-white font-bold cursor-pointer">
                                                        Bỏ theo dõi
                                                    </button>
                                                    <button
                                                        className="bg-gray-300 p-2 rounded-xl text-white font-bold cursor-pointer">
                                                        Đã Theo dõi
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => followUserAction(friend?.userId)}
                                                    className="bg-blue-600 p-2 rounded-xl text-white font-bold cursor-pointer hover:bg-opacity-50">
                                                    Theo dõi
                                                </button>
                                            )}
                                        </div>
                                        <div className=" w-auto text-baseText flex flex-col justify-center items-start gap-2 px-5 mt-2">
                                            <p className="font-bold">@{hoveredUserData?.username}</p>
                                            <span>
                                                {hoveredUserData?.gentle === 0
                                                    ? "Nam"
                                                    : hoveredUserData?.gentle === 1
                                                        ? "Nữ"
                                                        : "Khác"}
                                            </span>
                                            <p>{hoveredUserData?.introduction}</p>
                                            {/* Stats Section */}
                                            <div className="flex gap-4 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <span><i className="fas fa-user-plus text-blue-500"></i></span>
                                                    <span className="font-semibold text-black">{hoveredUserData?.followingCount || 0}</span>
                                                    <span className="text-gray-600">Following</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span><i className="fas fa-users text-green-500"></i></span>
                                                    <span className="font-semibold text-black">{hoveredUserData?.followedCount || 0}</span>
                                                    <span className="text-gray-600">Followed</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span><i className="fas fa-file-alt text-purple-500"></i></span>
                                                    <span className="font-semibold text-black">{hoveredUserData?.postCount || 0}</span>
                                                    <span className="text-gray-600">Post</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-10  ">
                        {/* Post Site */}
                        {postList?.sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
                            .map((post) => (
                                <div key={post?.postId} className="w-full flex flex-col gap-5 !bg-white rounded-2xl p-5">
                                    {/* Header */}
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={post?.avatar_Url} alt="" className="w-16 h-16 rounded-full object-cover" />
                                            <div className="flex flex-col items-start">
                                                <h4 className="font-bold">{post?.Username || "Nguyen Quoc Huy Chuong"}</h4>
                                                <p className="text-baseText">{changeTimeType(post?.createAt)}</p>
                                                <p className="text-baseText">Nội dung: <span className="text-blue-600 font-bold">{post?.title}</span></p>
                                            </div>
                                        </div>
                                        <i className="fas fa-ellipsis-h text-black-700 mr-2 text-xl"></i>
                                    </div>
                                    <div className="w-full flex">
                                        <p className="text-left text-baseText">{post?.body}</p>
                                    </div>
                                    {/* Image + Action */}
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        {/* Image */}
                                        <div className="w-full flex justify-center">
                                            <img src={post?.imgURL} alt="" className=" w-[90%] h-auto rounded-2xl" />
                                        </div>
                                        {/* Interact Data */}
                                        <div className=" w-[90%] flex justify-between items-center space-x-4">
                                            <p className="text-baseText">{post?.totalLike} lượt thích</p>
                                            <p
                                                onClick={() => toggleComment(post?.postId)}
                                                className="text-baseText
                                            hover:text-blue-600 cursor-pointer
                                            hover:underline
                                            ">{post?.totalComment} bình luận</p>
                                        </div>
                                        {/* Action */}
                                        <div className="w-full flex justify-center">
                                            <div className="w-[90%] flex justify-start space-x-4">
                                                {/* Like Icon */}
                                                <div onClick={() => handleLikeAction(post?.postId)} className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer">
                                                    {checkPostLiked[post?.postId] === true ? (
                                                        <i className="fa-solid fa-heart text-2xl text-red-500 transition-colors duration-200"></i>
                                                    ) : (
                                                        <i className="fa-regular fa-heart text-2xl text-black transition-colors duration-200 hover:text-red-500"></i>
                                                    )}
                                                </div>
                                                {/* Comment Icon */}
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full">
                                                    <i className="fa-regular fa-comment text-2xl"></i>
                                                </div>
                                                {/* Message Icon */}
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full">
                                                    <i className="fa-regular fa-message text-2xl"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mutual Comment */}
                                    {isCommentMutal[post.postId] ? (
                                        commentList[post?.postId]?.length > 0 ? (
                                            <div className="flex flex-col w-full gap-5">
                                                {renderComments(commentList[post?.postId])}
                                            </div>
                                        ) : (
                                            <p className="text-baseText">Hãy là người đầu tiên bình luận</p>
                                        )
                                    ) : null}
                                    {/* Your Comment */}
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        createComment(commentText, currentUser?.userId, post?.postId, ParrentId);
                                    }} className="w-full space-x-4">
                                        <div className="flex items-center gap-3">
                                            <img src={currentUser?.avatarUrl} alt="" className="h-12 w-12 rounded-full" />
                                            <div className="w-[90%]">
                                                <input
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setCommentText(value);
                                                        if (ParrentId && !value.startsWith(`@${replyTo}`)) {
                                                            setReplyTo(null);
                                                            setParrentId(null);
                                                        }
                                                    }}
                                                    value={commentText}
                                                    className="border border-solid border-gray-300 p-3 w-full rounded-xl"
                                                    type="text"
                                                    placeholder="Để lại bình luận của bạn"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="w-[25%] p-4 bg-white max-h-[95vh] sticky top-0 rounded-xl">
                {/* Column 3 content */}
                <div className="flex flex-col mt-3 items-start gap-8 text-baseText">
                    <h4 className="text-black font-bold text-xl">Hội nhóm nổi bật</h4>
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/grRk2Hy/Should-You-Quit-Your-Job-in-a-Bad-Economy.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Nhóm IT việc làm</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/9Y7tMxf/Gambar-Konsep-Reka-Bentuk-Rata-Moden-Reka-Bentuk-Ui-Ux-Dengan-Watak-Dan-Tempat-Teks-Dapat-Digunakan.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Chia sẽ kinh nghiệm UX/UI</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/xgxVbCn/Piquenique-como-fazer-e-90-ideias-para-curtir-ao-ar-livre.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Picnic cuối tuần</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/Z2LxQjV/File-Excel-t-nh-thu-thu-nh-p-c-nh-n-m-i-nh-t.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Kế toán online</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/NFf8wQv/C.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Bậc thầy .NET</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/42fkfVB/t-i-xu-ng-2.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Việc làm tại nhà</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-5 items-start gap-8 text-baseText">
                    <h4 className="text-black font-bold text-xl">Nhóm của bạn</h4>
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/f2qytMf/Cielo-rojo-sangre-Netflix.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Tivi Series Kinh dị</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src="https://i.ibb.co/2g0n4c6/Latest-Junior-Engineer-Job-Openings-in-Delhi-for-fresher-and-Experienced.jpg" alt="" className="h-16 w-16 rounded-full" />
                            <h4>Việc làm cho fresher/junior</h4>
                        </div>
                        <div className="w-full flex items-center justify-center mt-5">
                            <button
                                onClick={handleLogout}
                                className="py-3 px-5 rounded-xl bg-red-600 text-white font-bold ">Đăng xuất</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Site */}
            {
                isPostModalOpen && (
                    <div style={{ zIndex: 1000 }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className=" w-[30%] h-auto bg-white rounded-xl">
                            <div className="w-full flex items-center justify-between p-4">
                                <h1 className="text-xl font-bold text-black">Tạo bài đăng</h1>
                                <i onClick={() => setIsPostModalOpen(false)} className="fas fa-times text-black-700 mr-2"></i>
                            </div>
                            <div className="w-full flex flex-col gap-5 p-4 justify-center items-center">
                                <input onChange={(e) => setPostTile(e.target.value)} className="border border-soid border-gray-300 p-3 w-full rounded-xl" id="title" type="text" value={postTile} placeholder="Tiêu đề" />
                                <textarea onChange={(e) => setBody(e.target.value)} className="border border-soid border-gray-300 p-3 w-full rounded-xl" id="body" type="text" value={body} placeholder="Nội dung" />
                                <input className="border border-soid border-gray-300 p-3 w-full rounded-xl"
                                    id="image"
                                    accept="image/*"
                                    type="file"
                                    src={imagePreview}
                                    onChange={handleImageChange}
                                    placeholder="Hình ảnh" />
                                <button disabled={isPostCreating} onClick={createPost} className=" flex items-center justify-center w-1/2 bg-blue-500 text-white font-bold p-3 rounded-xl">
                                    {isPostCreating ?
                                        <div role="status">
                                            <svg aria-hidden="true" className=" flex w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        : "Đăng bài ngay"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Favorite Selection From User */}
            {
                isFavoriteSelectionModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
                        <div className="w-[30%] gap-5 h-auto bg-white rounded-xl">
                            <div className="w-full flex items-center justify-between p-4">
                                <h1 className="text-xl font-bold text-black">Chọn sở thích</h1>
                                <i onClick={() => setIsFavoriteSelectionModalOpen(false)} className="fas fa-times text-black-700 mr-2"></i>
                            </div>
                            {FavoriteList?.map((favorite) => (
                                <Tag
                                    key={favorite?.favoriteId}
                                    color={selectedFavorites.includes(favorite.favoriteId) ? "blue" : "default"}
                                    onClick={() => toggleFavorite(favorite.favoriteId)}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    {favorite?.favoriteName}
                                </Tag>
                            ))}
                            <div className="mt-5"
                                onClick={() => saveFavoriteOfUser()}
                            >
                                <button className="text-blue-600"> Lưu sở thích </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};
export default HomePage;
