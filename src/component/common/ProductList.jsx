import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
    const { cart, dispatch } = useCart();

    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const incrementItem = (product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product });
    };

    const decrementItem = (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: product });
        }
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 px-6 py-4 mx-auto">
            {products.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                return (
                    <div
                        key={index}
                        className="w-full h-[400px] border border-[#e0e0e0] shadow-md overflow-hidden text-center transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 bg-white rounded"
                    >
                        <Link to={`/product/${product.id}`} className="text-inherit no-underline block">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-[200px] w-full object-cover"
                            />
                            <h3 className="text-[#333] my-2 text-lg font-semibold">{product.name}</h3>

                            <p className="text-[#777] text-sm mx-5 mb-2 h-[20px] overflow-hidden">
                                {product.description}
                            </p>

                            <span className="text-[#333] text-base font-medium block mb-2">
                                ${product.price.toFixed(2)}
                            </span>
                        </Link>
                        {cartItem ? (
                            <div className="flex items-center justify-center mb-3">
                                <button
                                    onClick={() => decrementItem(product)}
                                    className="bg-[#f68b1e] text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                                >
                                    -
                                </button>
                                <span className="mx-3 text-lg text-[#333]">{cartItem.quantity}</span>
                                <button
                                    onClick={() => incrementItem(product)}
                                    className="bg-[#f68b1e] text-white rounded px-4 py-2 hover:bg-blue-600 transition"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-[#f68b1e] text-white rounded px-6 py-2 mb-3 hover:bg-blue-600 transition"
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;