import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/counter/cartSlice";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <FiShoppingBag className="text-4xl text-gray-300" />
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-3">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                    Looks like you haven't added anything to your cart yet. Explore our top categories to find something you love.
                </p>
                <Link 
                    to="/shop" 
                    className="px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors rounded-sm"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl mb-12">
                    Shopping Cart
                </h1>
                <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    {/* left column: cart items list */}
                    <section aria-labelledby="cart-heading" className="lg:col-span-7 xl:col-span-8">
                        <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex py-6 sm:py-8">
                                    <div className="shrink-0">
                                        <img 
                                            src={item.thumbnail} 
                                            alt={item.title} 
                                            className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32 border border-gray-100 bg-gray-50" 
                                        />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-base font-medium text-gray-900">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                                                <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <p className="text-base font-medium text-gray-900 sm:text-right">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center">
                                            <button 
                                                type="button" 
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="cursor-pointer text-sm font-medium text-gray-400 hover:text-red-500 flex items-center gap-2 transition-colors group"
                                            >
                                                <FiTrash2 className="text-lg transition-transform" />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                    {/* right column: order summary */}
                    <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 xl:col-span-4 lg:mt-0 lg:p-8 lg:sticky lg:top-8 border border-gray-100">
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900 mb-6">
                            Order Summary
                        </h2>
                        <dl className="space-y-4 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd className="font-medium text-gray-900">${totalPrice.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center">
                                    <span>Shipping estimate</span>
                                </dt>
                                <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Total</dt>
                                <dd className="text-xl font-medium text-gray-900">${totalPrice.toFixed(2)}</dd>
                            </div>
                        </dl>
                        <div className="mt-8">
                            <Link 
                                to="/checkout" 
                                className="w-full flex items-center justify-center rounded-sm border border-transparent bg-black px-4 py-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50 transition-all"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p className="flex gap-1 justify-center items-center">
                                or 
                                <Link to="/" className="font-medium text-black hover:underline">
                                    Continue Shopping
                                </Link>
                            </p>
                        </div>
                    </section>
                    
                </div>
            </div>
        </div>
    );
};

export default CartPage;