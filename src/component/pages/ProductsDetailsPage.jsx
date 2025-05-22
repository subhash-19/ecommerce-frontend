import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { cart, dispatch } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ApiService.getProductById(productId);
                setProduct(response.product); // or just response, adjust based on API
            } catch (error) {
                console.log(error.message || error);
            }
        };

        if (productId) fetchProduct();
    }, [productId]);

    const addToCart = () => {
        if (product) {
            dispatch({ type: "ADD_ITEM", payload: product });
        }
    };

    const incrementItem = () => {
        if (product) {
            dispatch({ type: "INCREMENT_ITEM", payload: product });
        }
    };

    const decrementItem = () => {
        if (product) {
            const cartItem = cart.find((item) => item.id === product.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({ type: "DECREMENT_ITEM", payload: product });
            } else {
                dispatch({ type: "REMOVE_ITEM", payload: product });
            }
        }
    };

    if (!product) {
        return <p>Loading product details ...</p>;
    }

    const cartItem = cart.find((item) => item.id === product.id);

    return (
        <div className="max-w-[350px] mx-auto my-40 p-4 border border-gray-300 rounded-lg flex flex-col items-center gap-4">
            <img
                src={product?.imageUrl || "/placeholder.jpg"}
                alt={product?.name}
                className="w-[350px] h-auto"
            />
            <h1 className="text-center text-lg font-semibold">{product?.name}</h1>
            <p>{product?.description}</p>
            <span className="block text-[20px] text-[#f68b1e]">${product.price.toFixed(2)}</span>

            {cartItem ? (
                <div className="flex items-center gap-2 w-full">
                    <button
                        onClick={decrementItem}
                        className="w-full py-2 rounded-md bg-[#f68b1e] text-white text-base hover:bg-blue-600 cursor-pointer"
                    >
                        -
                    </button>
                    <span className="text-base font-medium">{cartItem.quantity}</span>
                    <button
                        onClick={incrementItem}
                        className="w-full py-2 rounded-md bg-[#f68b1e] text-white text-base hover:bg-blue-600 cursor-pointer"
                    >
                        +
                    </button>
                </div>
            ) : (
                <button
                    onClick={addToCart}
                        className="w-full py-2 rounded-md bg-[#f68b1e] text-white text-base hover:bg-blue-600  cursor-pointer"
                >
                    Add To Cart
                </button>
            )}
        </div>
    );
};

export default ProductDetailsPage;
