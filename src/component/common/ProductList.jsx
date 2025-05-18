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
        <div className="flex flex-wrap gap-5 justify-center p-5 mx-[5rem] my-0">
            {products.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                return (
                    <div
                        className="border border-[#e0e0e0] shadow-[0_2px_5px_rgba(0,0,0,0.1)] overflow-hidden text-center transition-[transform,box-shadow] duration-300 ease-in-out w-[250px] hover:shadow-[0_2px_5px_rgba(0,0,0,0.1)] hover:transform translate-x-[-5px]"
                        key={index}
                    >
                        <Link to={`/product/${product.id}`} className="text-inherit no-underline">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-[200px] w-[100%] object-cover"
                            />
                            <h3 className="text-[#333] my-[10px] mx-0 text-[1.2em]">{product.name}</h3>

                            <p className="text-[#777] text-[0.9em] my-[10px] mx-[20px] h-[60px] overflow-hidden">
                                {product.description}
                            </p>

                            <span className="text-[#333] text-[1.1em] my-[10px] mx-0 block">
                                ${product.price.toFixed(2)}
                            </span>
                        </Link>
                        {cartItem ? (
                            <div className="flex items-center justify-center my-[10px] mx-0">
                                <button
                                    onClick={() => decrementItem(product)}
                                    className="bg-[#f68b1e] border-0 rounded text-[1em] cursor-pointer my-[10px] mx-0 py-[10px] px-[20px] transition-colors duration-300 ease-in-out hover:bg-blue-600"
                                >
                                    -
                                </button>
                                <span className="my-0 mx-[10px] text-[1.2em] text-[#333]">{cartItem.quantity}</span>
                                <button
                                    onClick={() => incrementItem(product)}
                                    className="bg-[#f68b1e] border-0 rounded text-[1.2em] cursor-pointer my-[10px] mx-0 py-[10px] px-[20px] transition-colors duration-300 ease-in-out hover:bg-blue-600"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-[#f68b1e] border-0 rounded text-[1em] cursor-pointer my-[10px] mx-0 py-[10px] px-[20px] transition-colors duration-300 ease-in-out hover:bg-blue-600"
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
