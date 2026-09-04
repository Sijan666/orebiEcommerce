import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../../features/counter/cartSlice";
import { FiShoppingBag, FiLock, FiCreditCard, FiTruck, FiBox, FiChevronRight } from "react-icons/fi";

const FloatingInput = ({ type, name, label, value, onChange, error, maxLength }) => {
    return (
        <div className="relative w-full">
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={`peer block w-full appearance-none rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} bg-white px-4 pb-2.5 pt-6 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all`}
                placeholder=" "
            />
            <label
                htmlFor={name}
                className={`absolute left-4 top-4 z-10 origin-left transform text-sm duration-150 cursor-text 
                ${error ? 'text-red-500' : 'text-gray-500'}
                ${value ? '-translate-y-2.5 scale-75' : 'translate-y-0 scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100'} 
                peer-focus:-translate-y-2.5 peer-focus:scale-75`}
            >
                {label}
            </label>
            {error && <span className="absolute right-4 top-4 text-xs text-red-500 font-medium">{error}</span>}
        </div>
    );
};

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        fullName: "",
        country: "Bangladesh", 
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCvc: ""
    });

    const [errors, setErrors] = useState({});
    const [deliveryMethod, setDeliveryMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const courierOptions = ["Pathao Express", "RedX", "Steadfast", "eCourier", "Paperfly", "Sundarban"];
    const [courier, setCourier] = useState(courierOptions[0]);
    const [isProcessing, setIsProcessing] = useState(false);
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = deliveryMethod === "express" ? 15.00 : 0.00;
    const finalTotal = subtotal + shippingCost;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) newErrors.email = "Required";
        else if (!formData.email.includes("@") || !formData.email.includes(".")) newErrors.email = "Invalid email";
        
        if (!formData.phone.trim()) newErrors.phone = "Required";
        if (!formData.fullName.trim()) newErrors.fullName = "Required";
        if (!formData.country.trim()) newErrors.country = "Required";
        if (!formData.address.trim()) newErrors.address = "Required";
        if (!formData.city.trim()) newErrors.city = "Required";
        if (!formData.zipCode.trim()) newErrors.zipCode = "Required";

        if (paymentMethod === 'card') {
            if (!formData.cardNumber.trim()) newErrors.cardNumber = "Required";
            if (!formData.cardName.trim()) newErrors.cardName = "Required";
            if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Required";
            if (!formData.cardCvc.trim()) newErrors.cardCvc = "Required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsProcessing(true);
            setTimeout(() => {
                const purchasedItems = [...cartItems];
                const amountPaid = finalTotal;

                dispatch(clearCart());
                navigate("/success", { 
                    state: { 
                        paymentMethod: paymentMethod, 
                        courier: courier, 
                        city: formData.city,
                        purchasedItems: purchasedItems, 
                        amountPaid: amountPaid,
                        buyerDetails: formData
                    } 
                });
            }, 1800);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 bg-white">
                <FiShoppingBag className="text-5xl text-gray-200 mb-6" />
                <h2 className="text-2xl font-light text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6 text-center">Add some premium items to get started.</p>
                <Link to="/shop" className="px-8 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#fafafa] min-h-screen pb-24 font-sans">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <nav className="flex items-center space-x-2 text-xs font-medium text-gray-400 mb-10 uppercase tracking-widest">
                    <Link to="/cart" className="hover:text-black transition-colors cursor-pointer">Cart</Link>
                    <FiChevronRight className="text-gray-300" />
                    <span className="text-black">Checkout</span>
                </nav>
                <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
                    <div className="lg:col-span-7 space-y-10">
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-10">
                            <section>
                                <h2 className="text-lg font-medium text-gray-900 mb-5">Contact Information</h2>
                                <div className="space-y-4">
                                    <FloatingInput type="email" name="email" label="Email address" value={formData.email} onChange={handleChange} error={errors.email} />
                                    <FloatingInput type="tel" name="phone" label="Phone number" value={formData.phone} onChange={handleChange} error={errors.phone} />
                                </div>
                            </section>
                            <section>
                                <h2 className="text-lg font-medium text-gray-900 mb-5">Shipping Address</h2>
                                <div className="space-y-4">
                                    <FloatingInput type="text" name="country" label="Country / Region" value={formData.country} onChange={handleChange} error={errors.country} />
                                    <FloatingInput type="text" name="fullName" label="Full name" value={formData.fullName} onChange={handleChange} error={errors.fullName} />
                                    <FloatingInput type="text" name="address" label="Street address, Apartment, Suite" value={formData.address} onChange={handleChange} error={errors.address} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FloatingInput type="text" name="city" label="City" value={formData.city} onChange={handleChange} error={errors.city} />
                                        <FloatingInput type="text" name="zipCode" label="ZIP / Postal code" value={formData.zipCode} onChange={handleChange} error={errors.zipCode} />
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-lg font-medium text-gray-900 mb-5">Delivery Method</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`relative flex cursor-pointer flex-col rounded-lg border p-5 transition-all ${deliveryMethod === 'standard' ? 'border-black bg-white ring-1 ring-black shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                        <input type="radio" name="deliveryMethod" value="standard" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} className="sr-only cursor-pointer" />
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-900 flex items-center gap-2"><FiBox className="text-gray-400" /> Standard</span>
                                            <span className="text-sm font-medium text-gray-900">Free</span>
                                        </div>
                                        <span className="text-xs text-gray-500">4-5 Business Days</span>
                                    </label>
                                    <label className={`relative flex cursor-pointer flex-col rounded-lg border p-5 transition-all ${deliveryMethod === 'express' ? 'border-black bg-white ring-1 ring-black shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                        <input type="radio" name="deliveryMethod" value="express" checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')} className="sr-only cursor-pointer" />
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-900 flex items-center gap-2"><FiTruck className="text-gray-400" /> Express</span>
                                            <span className="text-sm font-medium text-gray-900">+$15.00</span>
                                        </div>
                                        <span className="text-xs text-gray-500">1-2 Business Days</span>
                                    </label>
                                </div>
                            </section>
                            <section>
                                <h2 className="text-lg font-medium text-gray-900 mb-5">Select Courier Service</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {courierOptions.map(option => (
                                        <label key={option} className={`relative flex items-center justify-center cursor-pointer rounded-lg border p-4 transition-all ${courier === option ? 'border-black bg-black text-white shadow-md ' : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'}`}>
                                            <input type="radio" name="courier" value={option} checked={courier === option} onChange={() => setCourier(option)} className="sr-only cursor-pointer" />
                                            <span className="text-xs font-semibold text-center">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </section>
                            <section>
                                <div className="flex justify-between items-end mb-5">
                                    <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><FiLock /> Secure SSL</span>
                                </div>
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="border-b border-gray-200">
                                        <label className={`flex items-center justify-between cursor-pointer p-5 transition-colors ${paymentMethod === 'card' ? 'bg-[#f8f9fa]' : 'hover:bg-gray-50'}`}>
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 text-black border-gray-300 focus:ring-black cursor-pointer" />
                                                <span className="text-sm font-medium text-gray-900">Credit Card</span>
                                            </div>
                                            <FiCreditCard className={`text-xl transition-colors ${paymentMethod === 'card' ? 'text-black' : 'text-gray-400'}`} />
                                        </label>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${paymentMethod === 'card' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="p-5 bg-[#f8f9fa] pt-0 space-y-4">
                                                <FloatingInput type="text" name="cardNumber" label="Card number" value={formData.cardNumber} onChange={handleChange} error={errors.cardNumber} maxLength="16" />
                                                <FloatingInput type="text" name="cardName" label="Name on card" value={formData.cardName} onChange={handleChange} error={errors.cardName} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <FloatingInput type="text" name="cardExpiry" label="Expiration (MM/YY)" value={formData.cardExpiry} onChange={handleChange} error={errors.cardExpiry} maxLength="5" />
                                                    <FloatingInput type="text" name="cardCvc" label="Security code" value={formData.cardCvc} onChange={handleChange} error={errors.cardCvc} maxLength="4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <label className={`flex items-center justify-between cursor-pointer p-5 transition-colors ${paymentMethod === 'cod' ? 'bg-[#f8f9fa]' : 'hover:bg-gray-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-4 w-4 text-black border-gray-300 focus:ring-black cursor-pointer" />
                                            <span className="text-sm font-medium text-gray-900">Cash on Delivery</span>
                                        </div>
                                    </label>
                                </div>
                            </section>
                        </form>
                    </div>
                    <div className="mt-12 lg:mt-0 lg:col-span-5">
                        <div className="lg:sticky lg:top-8">
                            <h2 className="sr-only">Order summary</h2>
                            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-100">
                                <ul role="list" className="divide-y divide-gray-100 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar mb-4">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex py-4 space-x-4">
                                            <div className="relative h-16 w-16 flex-none rounded-md border border-gray-100 bg-gray-50 overflow-hidden">
                                                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover object-center" />
                                                <span className="absolute top-0 right-0 -mr-1 -mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex flex-auto flex-col justify-center">
                                                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                                                <p className="text-xs text-gray-500 capitalize mt-1">{item.category || "Item"}</p>
                                            </div>
                                            <p className="flex-none text-sm font-medium text-gray-900 self-center">${(item.price * item.quantity).toFixed(2)}</p>
                                        </li>
                                    ))}
                                </ul>
                                <dl className="space-y-4 border-t border-gray-100 pt-6 text-sm">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">Shipping</dt>
                                        <dd className="font-medium text-gray-900">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Total</dt>
                                        <dd className="text-2xl font-semibold text-black">${finalTotal.toFixed(2)}</dd>
                                    </div>
                                </dl>
                                <button 
                                    type="submit" 
                                    form="checkout-form"
                                    disabled={isProcessing}
                                    className="cursor-pointer group relative mt-8 w-full overflow-hidden rounded-xl bg-black px-6 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-500 ease-out hover:shadow-2xl active:scale-95 active:shadow-sm disabled:cursor-wait disabled:bg-neutral-900 disabled:scale-100 disabled:hover:shadow-none"
                                >
                                    <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"></div>
                                    <div className="relative flex items-center justify-center gap-3">
                                        {isProcessing ? (
                                            <>
                                                <svg className="h-5 w-5 animate-spin text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Authorizing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Pay ${finalTotal.toFixed(2)}</span>
                                            </>
                                        )}
                                    </div>
                                </button>
                                <div className="mt-6 flex justify-center text-xs text-gray-400">
                                    By placing your order you agree to our Terms & Conditions.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;