import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await ApiService.GetAllCategory();
            console.log("Categories API response:", response);
            setCategories(response.categoryList || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError(error.response?.message || error.message || 'Unable to fetch categories');
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div className="max-w-[800px] mx-auto p-5 rounded-[8px] shadow-sm">
            {error ? (
                <p className="text-red-700 text-center text-[1.2rem] mt-5">
                    {error}
                </p>
            ) : (
                <div>
                    <h2 className="text-[2rem] mb-5 text-[#333] text-center">
                        Categories
                    </h2>
                    <ul className="list-none p-0 flex flex-wrap gap-5 justify-center">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                style={{
                                    flex: "1 1 calc(33.33% - 20px)",
                                    maxWidth: "calc(33.33% - 20px)",
                                }}
                                className="p-4 text-[1.2rem] bg-[#f6f6b1e] text-white rounded cursor-pointer transition-colors duration-300 ease-in-out"
                            >
                                <button
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="w-[100px] p-[15px] text-[1.2rem] bg-[#f68b1e] text-white border-none rounded-[5px] cursor-pointer transition-colors duration-300 ease-linear"
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryListPage;
