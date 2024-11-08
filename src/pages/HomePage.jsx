import React from "react";
import men from "../assets/men.png";
import woman from "../assets/woman.png";
import imgCol1 from "../assets/homepagecolumn1.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
const HomePage = () => {
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
                        <button className="relative inline-flex items-center justify-center mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 p-0 border border-blue-600">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 group-hover:text-white text-blue-600 font-bold">
                                <i className="fas fa-plus mr-2"></i>
                                Thêm bài đăng
                            </span>
                        </button>
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
                                    <p className="text-baseText">Chủ để: <span className="text-blue-900 font-bold">Công nghệ</span></p>
                                    <p className="text-baseText">1 giờ trước</p>
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
                <div className="flex gap-5 mt-3">
                    <h4 className="text-black font-bold text-xl">Hội nhóm nổi bật</h4>
                </div>
            </div>
        </div >
    );
};
export default HomePage;
