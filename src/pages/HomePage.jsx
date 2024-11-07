import React from "react";
import men from "../assets/men.png";
const HomePage = () => {
    return (
        <div className="flex w-full h-screen gap-6">
            <div className="w-[25%] p-4 bg-white max-h-[85vh] sticky top-0 rounded-xl">
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
                        <div className="flex flex-col w-full gap-3 h-auto mt-3">
                            <h1 className="text-xl font-bold flex text-black-200">Sở thích</h1>
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
                        <div className="flex flex-col w-full gap-3 h-auto mt-3">
                            <h1 className="text-xl font-bold flex text-black-200">Bài đăng</h1>

                            <button className="relative inline-flex items-center justify-center mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 p-0">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Thêm bài đăng
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[50%] border border-solid border-gray-300 p-4 bg-red-600 overflow-y-auto rounded-xl">
                {/* Column 2 content */}
            </div>
            <div className="w-[25%] border border-solid border-gray-300 p-4 bg-green-600 max-h-[85vh] sticky top-0 rounded-xl">
                {/* Column 3 content */}
            </div>
        </div>
    );
};
export default HomePage;
