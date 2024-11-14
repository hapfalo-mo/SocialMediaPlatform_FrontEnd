import React, { useEffect, useState } from "react";
import * as api from "../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const RegisterFavorite = () => {
    const navigate = useNavigate();
    const [showFavorites, setShowFavorites] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [modalError, setModalError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleCheckboxChange = (subject) => {
        const subjectId = subject?.favoriteId;
        setFavorites(prevFavorites =>
            prevFavorites.includes(subjectId)
                ? prevFavorites.filter(item => item !== subjectId)
                : [...prevFavorites, subjectId]
        );
    };
    // Get All Favorite List 
    const getAllFavorites = async () => {
        try {
            const response = await api.getAllFavorites();
            if (response) {
                console.log("response", response);
                setFavoriteList(response?.data?.value);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllFavorites();
    }, []);

    const handleSaveFavorites = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const decodeToken = jwtDecode(token);
            const userId = decodeToken?.UsereId;
            if (favorites.length === 0) {
                setModalError(true);
                setErrorMessage("Vui lòng chọn ít nhất một lĩnh vực quan tâm");
                return;
            }
            const response = await api.saveRegisteredFavor(userId, favorites);
            if (response.status === 201) {
                navigate("/home");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="w-full h-full">
            <div className="flex flex-col items-center justify-center min-h-screen w-full">
                {!showFavorites ? (
                    // Welcome Section
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-blue-600">Chào mừng bạn đến với hệ thống Larion Project</h1>
                        <p className="mt-4 text-lg text-gray-700">Rất vui được gặp bạn.</p>
                        <button
                            onClick={() => setShowFavorites(true)}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Hãy cùng làm một khảo sát nhỏ với chúng tôi nhé
                        </button>
                    </div>
                ) : (
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold text-blue-600 text-center">Chọn Lĩnh vực mà bạn quan tâm</h1>
                        <p className="mt-2 text-gray-700 text-center">Chọn những lĩnh vực mà bạn quan tâm để chúng tôi có thể giúp bạn có trải nghiệm tốt hơn nhé..</p>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {favoriteList.map(object => (
                                <label key={object?.favoriteId} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={favorites.includes(object.favoriteId)}
                                        onChange={() => handleCheckboxChange(object)}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <span className="text-gray-700">{object?.favoriteName}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            onClick={handleSaveFavorites}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Tiếp tục
                        </button>
                    </div>
                )}
            </div>
            {modalError && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
                    <div className="w-[30%] gap-5 h-auto bg-white rounded-xl">
                        <div className="w-full flex items-center justify-between p-4">
                            <h1 className="text-xl font-bold text-red-400">  <span className="fas fa-exclamation-circle text-red-600 mr-2"></span> Đã có lỗi xảy ra.</h1>
                            <i
                                onClick={() => setModalError(false)}
                                className="fas fa-times text-black-700 mr-2 cursor-pointer"></i>
                        </div>
                        <div className="mt-5 p-10">
                            <p className="text-baseText text-xl">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterFavorite;
