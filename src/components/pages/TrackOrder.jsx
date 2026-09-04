import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FiSearch, FiPackage, FiTruck, FiHome, FiCheck, FiChevronRight, FiAlertCircle, FiMapPin, FiCalendar } from "react-icons/fi";

const TrackOrder = () => {
    const location = useLocation();
    const initialOrderId = location.state?.orderId || "";
    
    const [orderId, setOrderId] = useState(initialOrderId);
    const [isSearching, setIsSearching] = useState(false);
    const [trackingResult, setTrackingResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (initialOrderId) {
            handleTrackOrder();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialOrderId]);

    const handleTrackOrder = (e) => {
        if (e) e.preventDefault();
        
        setError("");
        
        if (!orderId.trim()) {
            setError("Please enter a valid Order Number.");
            return;
        }

        setIsSearching(true);

        setTimeout(() => {
            setIsSearching(false);

            const existingOrders = JSON.parse(localStorage.getItem("premiumOrders")) || {};
            const searchId = orderId.toUpperCase().trim();
            const orderData = existingOrders[searchId];

            if (orderData) {
                const locationName = orderData.city ? `${orderData.city} Sort Hub` : "Central Dispatch Hub";

                setTrackingResult({
                    id: searchId,
                    date: orderData.date,
                    status: orderData.status || "Processing",
                    expectedDelivery: "In 4-5 Business Days",
                    courier: orderData.courier || "Express Logistics",
                    lastLocation: locationName
                });
            } else {
                setTrackingResult(null);
                setError("Order not found. Please verify your exact Token / Order No. and try again.");
            }
        }, 1500);
    };

    return (
        <div className="bg-[#fafafa] min-h-[85vh] py-16 px-4 font-sans flex flex-col items-center selection:bg-black selection:text-white">
            <div className="w-full max-w-3xl">
                <nav className="flex items-center space-x-2 text-[11px] font-semibold text-gray-400 mb-10 uppercase tracking-[0.2em] justify-center">
                    <Link to="/" className="hover:text-black transition-colors cursor-pointer">Home</Link>
                    <FiChevronRight className="text-gray-300" />
                    <span className="text-black">Track Order</span>
                </nav>
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Track Your Delivery</h1>
                    <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                        Enter your tracking token below to get real-time updates on your package.
                    </p>
                </div>
                <div className="max-w-2xl mx-auto mb-12 transform transition-all rounded-2xl bg-white p-2 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1 flex items-center">
                            <FiSearch className="absolute left-5 text-gray-400 text-lg" />
                            <input 
                                type="text" 
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="e.g. ORD-123456" 
                                className="w-full pl-12 pr-4 py-4 bg-transparent focus:outline-none text-gray-900 font-medium placeholder:font-normal placeholder:text-gray-400"
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={isSearching}
                            className="cursor-pointer sm:w-40 flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ease-out hover:bg-gray-900 hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isSearching ? (
                                <svg className="h-5 w-5 animate-[spin_0.8s_linear_infinite] text-white/90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Track Now"
                            )}
                        </button>
                    </form>
                </div>
                {error && (
                    <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 text-red-500 bg-red-50 py-3 px-4 rounded-xl border border-red-100 text-sm font-medium animate-[fade-in_0.3s_ease-out]">
                        <FiAlertCircle className="text-lg shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
                {trackingResult && !isSearching && (
                    <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-[fade-in_0.5s_ease-out]">
                        <div className="bg-[#fafafa] p-8 sm:p-10 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                <div>
                                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Current Status</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{trackingResult.status}</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-1">Expected Delivery</p>
                                    <p className="text-base font-semibold text-black">{trackingResult.expectedDelivery}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-100 bg-white">
                            <div className="p-6">
                                <span className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1"><FiPackage /> Order No.</span>
                                <span className="font-bold text-gray-900 text-sm">{trackingResult.id}</span>
                            </div>
                            <div className="p-6">
                                <span className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1"><FiCalendar /> Order Date</span>
                                <span className="font-medium text-gray-900 text-sm">{trackingResult.date}</span>
                            </div>
                            <div className="p-6">
                                <span className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1"><FiTruck /> Courier</span>
                                <span className="font-medium text-gray-900 text-sm">{trackingResult.courier}</span>
                            </div>
                            <div className="p-6">
                                <span className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1"><FiMapPin /> Location</span>
                                <span className="font-medium text-gray-900 text-sm">{trackingResult.lastLocation}</span>
                            </div>
                        </div>
                        <div className="p-10 sm:p-14 pb-16 bg-white">
                            <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                                <div className="absolute left-[5%] right-[5%] top-6 -translate-y-1/2 h-1 bg-gray-100 rounded-full"></div>
                                <div className="absolute left-[5%] w-[33%] top-6 -translate-y-1/2 h-1 bg-black rounded-full transition-all duration-1000 ease-in-out"></div>
                                <div className="relative z-10 flex flex-col items-center gap-4 w-1/4">
                                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center ring-8 ring-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform hover:scale-110">
                                        <FiCheck className="text-xl" />
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="block text-[11px] sm:text-xs font-bold text-gray-900 uppercase tracking-widest">Placed</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex flex-col items-center gap-4 w-1/4">
                                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center ring-8 ring-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] animate-[pulse_2s_infinite] transition-transform hover:scale-110">
                                        <FiPackage className="text-xl" />
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="block text-[11px] sm:text-xs font-bold text-gray-900 uppercase tracking-widest">Processing</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex flex-col items-center gap-4 w-1/4">
                                    <div className="w-12 h-12 rounded-full bg-white text-gray-300 border-2 border-gray-100 flex items-center justify-center ring-8 ring-white transition-transform hover:scale-110">
                                        <FiTruck className="text-xl" />
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="block text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">Shipped</span>
                                    </div>
                                </div>
                                <div className="relative z-10 flex flex-col items-center gap-4 w-1/4">
                                    <div className="w-12 h-12 rounded-full bg-white text-gray-300 border-2 border-gray-100 flex items-center justify-center ring-8 ring-white transition-transform hover:scale-110">
                                        <FiHome className="text-xl" />
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="block text-[11px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest">Delivered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;