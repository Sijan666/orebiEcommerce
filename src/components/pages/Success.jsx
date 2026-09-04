import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiShoppingBag, FiCopy, FiMapPin, FiFileText } from "react-icons/fi";

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const paymentMethod = location.state?.paymentMethod || 'card'; 
    const courier = location.state?.courier || 'Pathao Express';
    const city = location.state?.city || 'Dhaka';
    const purchasedItems = location.state?.purchasedItems || [];
    const amountPaid = location.state?.amountPaid || 0;
    const buyerDetails = location.state?.buyerDetails || {}; 

    const [orderNumber, setOrderNumber] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const newOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrderNumber(newOrderNumber);
        
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
        setOrderDate(formattedDate);

        const existingOrders = JSON.parse(localStorage.getItem("premiumOrders")) || {};
        
        if (!existingOrders[newOrderNumber]) {
            existingOrders[newOrderNumber] = {
                date: formattedDate,
                courier: courier,
                city: city,
                status: "Processing"
            };
            localStorage.setItem("premiumOrders", JSON.stringify(existingOrders));
        }
    }, [courier, city]);

    const handleCopy = () => {
        navigator.clipboard.writeText(orderNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleViewReceipt = () => {
        navigate('/receipt', { 
            state: { 
                orderNumber, 
                orderDate, 
                paymentMethod, 
                courier, 
                city, 
                purchasedItems, 
                amountPaid, 
                buyerDetails 
            } 
        });
    };

    return (
        <div className="bg-[#fafafa] min-h-[80vh] flex items-center justify-center px-4 font-sans py-12">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-100 max-w-xl w-full text-center relative overflow-hidden animate-[fade-in_0.5s_ease-out]">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-black"></div>
                {/* success icon */}
                <div className="mx-auto w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <FiCheck className="text-white text-4xl font-bold" />
                </div>
                {/* heading & text */}
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">Order Confirmed!</h1>
                <p className="text-gray-500 text-sm sm:text-base mb-10 leading-relaxed px-4 max-w-md mx-auto">
                    {paymentMethod === 'cod' 
                        ? "Thank you for your purchase. We've received your order. Please keep the cash ready upon delivery." 
                        : "Thank you for your purchase. We've received your order and will send a shipping update shortly."}
                </p>
                {/* order info */}
                <div className="bg-[#f8f9fa] rounded-2xl border border-gray-100 p-6 mb-8 flex flex-col items-center justify-center gap-2">
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Your Order Number</p>
                    <div 
                        onClick={handleCopy} 
                        className="flex items-center justify-center gap-3 cursor-pointer group bg-white px-6 py-3 rounded-xl border border-gray-200 shadow-sm hover:border-black transition-all duration-300"
                        title="Click to copy"
                    >
                        <p className="text-xl sm:text-2xl font-black text-black tracking-wider">{orderNumber}</p>
                        {copied ? (
                            <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded">Copied!</span>
                        ) : (
                            <FiCopy className="text-gray-400 group-hover:text-black transition-colors" />
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">* Save this token to track your delivery status later.</p>
                </div>
                {/* view receipt button */}
                <div className="mb-10">
                    <button 
                        onClick={handleViewReceipt} 
                        className="cursor-pointer group inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
                    >
                        <FiFileText className="text-lg group-hover:-translate-y-0.5 transition-transform" />
                        View Full Receipt & Details
                    </button>
                </div>
                {/* action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-8 border-t border-gray-100">
                    <Link to="/shop" className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-6 py-4 rounded-xl text-sm font-bold tracking-wide hover:bg-gray-50 hover:border-black transition-all active:scale-[0.98]">
                        <FiShoppingBag className="text-lg" /> Continue Shopping
                    </Link>
                    <button onClick={() => navigate('/track', { state: { orderId: orderNumber } })} className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-xl text-sm font-bold tracking-wide hover:bg-gray-900 hover:shadow-lg transition-all active:scale-[0.98]">
                        <FiMapPin className="text-lg" /> Track Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;