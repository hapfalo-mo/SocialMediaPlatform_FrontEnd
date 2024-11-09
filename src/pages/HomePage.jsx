import React, { useEffect, useState } from "react";
import men from "../assets/men.png";
import woman from "../assets/woman.png";
import imgCol1 from "../assets/homepagecolumn1.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { storage, firestore, app } from "../configs/firebase";
import * as api from "../services/UserService";
import { ref, uploadBytesResumable, getStorage, getDownloadURL } from "firebase/storage";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const HomePage = () => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    // Post Modal Feature 
    const [postTile, setPostTile] = useState('');
    const [body, setBody] = useState('');
    const [isPostCreating, setIsPostCreating] = useState(false);
    const [postList, setPostList] = useState([]);
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
                console.log(response);
                setPostList(response?.value);
                console.log(response?.postResponseDTO.value);
                console.log("Get All Post Success");
            }
        } catch (error) {
            console.error("Get All Post Fail");
            console.log(error);
        }
    }
    useEffect(() => {
        getAllPost();
    }, [postList]);
    return (
        <div className="flex w-full h-screen gap-6">
            {/* Column 1 content */}
            <div className="w-[25%] p-4 bg-white max-h-[95vh] sticky top-0 rounded-xl">
                <div className="w-full">
                    <div className=" w-full flex flex-col items-center justify-center gap-8">
                        <img src={men} alt="User Avatar" className="w-32 h-32 rounded-full" />
                        <h1 className="text-2xl font-bold text-baseText">@chuongnguyen16112002</h1>
                        {/* Favorite site */}
                        <div className=" w-full flex">
                            <dl className="w-full flex items-center justify-center gap-10">
                                <div className=" w-[40%] flex flex-col justify-center items-center gap-2">
                                    <dt className="text-2xl font-bold text-blue-700">12K</dt>
                                    <dd className="text-sm text-baseText">Người theo dõi</dd>
                                </div>
                                <div className=" w-[35%] flex flex-col justify-center items-center gap-2">
                                    <dt className="text-2xl font-bold text-blue-700">900</dt>
                                    <dd className="text-sm text-baseText">Đang theo dõi</dd>
                                </div>
                                <div className=" w-[25%] flex flex-col justify-center items-center gap-2">
                                    <dt className="text-2xl font-bold text-blue-700">12</dt>
                                    <dd className="text-sm text-baseText">Bài đăng</dd>
                                </div>
                            </dl>
                        </div>
                        {/* Favorite Site */}
                        <div className="flex flex-col w-full gap-5 h-auto mt-3">
                            <div className="flex w-full items-center justify-between">
                                <h1 className="text-xl font-bold flex text-black-200">Sở thích</h1>
                                <i className="fas fa-ellipsis-h text-black-700 mr-2"></i>
                            </div>
                            <div>
                                <ul className=" flex flex-wrap gap-2 *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-blue-300 *:text-blue-400 dark:*:border-sky-500/15 dark:*:bg-sky-500/10">
                                    <li>Công nghệ</li>
                                    <li>Thiết kế</li>
                                    <li>Sales</li>
                                    <li>Marketing</li>
                                    <li>UX/UI</li>
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
            {/* Column 2 content */}
            <div className="w-[50%] p-4 bg-white rounded-xl bg-[#f7f7f7]">
                <div className="flex flex-col gap-5 mt-3 items-start">
                    <h1 className="text-black font-bold text-xl">Bạn có thể quan tâm</h1>
                    {/* Hint Friend Site */}
                    <div className=" w-full flex gap-8 pb-10 border-b border-gray-300">
                        <div className="flex flex-col gap-4">
                            <img src={woman} alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <h1 className="text-baseText font-bold">@daotdck</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={woman} alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <h1 className="text-baseText font-bold">@daotdck</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={woman} alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <h1 className="text-baseText font-bold">@daotdck</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={woman} alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <h1 className="text-baseText font-bold">@daotdck</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={woman} alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <h1 className="text-baseText font-bold">@daotdck</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={woman} alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <h1 className="text-baseText font-bold">@daotdck</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <img src={woman} alt="User Avatar" className="w-20 h-20 rounded-full" />
                            <h1 className="text-baseText font-bold">@daotdck</h1>
                        </div>
                    </div>
                    {/* Post Site */}
                    <div className="w-full flex flex-col gap-5 !bg-white rounded-2xl">
                        {/* Header */}
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={men} alt="" className="w-16 h-16 rounded-full" />
                                <div className="flex flex-col items-start">
                                    <h4 className="font-bold">Nguyen Quoc Huy Chuong</h4>
                                    <p className="text-baseText">1 giờ trước</p>
                                    <p className="text-baseText">Nội dung: <span></span></p>
                                </div>
                            </div>
                            <i className="fas fa-ellipsis-h text-black-700 mr-2 text-xl"></i>
                        </div>
                        <div className="w-full flex">
                            <p className="text-left text-baseText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore eaque consectetur, fugit repudiandae aperiam itaque eligendi eos saepe qui, odio, cum expedita quae numquam autem illum tempora eum corporis adipisci.</p>
                        </div>
                        {/* Image + Action */}
                        <div className="flex flex-col gap-1">
                            {/* Image */}
                            <div className="w-full flex justify-center">
                                <img src={imgCol1} alt="" className=" w-[90%] h-96 rounded-2xl" />
                            </div>
                            {/* Action */}
                            <div className="w-full flex justify-center">
                                <div className="w-[90%] flex justify-start space-x-4">
                                    {/* Like Icon */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full">
                                        <i className="fa-regular fa-heart text-2xl" aria-hidden="true"></i>
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
                        {/* Your Comment */}
                        <div className="w-full space-x-4">
                            <div className="flex items-center gap-3">
                                <img src={men} alt="" className="h-12 w-12 rounded-full" />
                                <div className="w-[90%]">
                                    <input className="border border-soid border-gray-300 p-3 w-full rounded-xl" type="text" placeholder="Để lại bình luận của bạn" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[25%] p-4 bg-white max-h-[95vh] sticky top-0 rounded-xl">
                {/* Column 3 content */}
                <div className="flex flex-col gap-5 mt-3 items-start gap-8">
                    <h4 className="text-black font-bold text-xl">Hội nhóm nổi bật</h4>
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Nhóm IT việc làm</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Chia sẽ kinh nghiệm UX/UI</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Nhóm IT việc làm</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Nhóm IT việc làm</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Nhóm IT việc làm</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Nhóm IT việc làm</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-3 items-start gap-8">
                    <h4 className="text-black font-bold text-xl">Nhóm của bạn</h4>
                    <div className="w-full flex flex-col gap-5">
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Nhóm IT việc làm</h4>
                        </div>
                        <div className="w-full flex items-center gap-3">
                            <img src={woman} alt="" className="h-16 w-16 rounded-full" />
                            <h4>Chia sẽ kinh nghiệm UX/UI</h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Site */}
            {isPostModalOpen && (
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
            )}
        </div >
    );
};
export default HomePage;
