import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiDownload, FiChevronLeft } from "react-icons/fi";

const Receipt = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // dynamic data capture
    const orderNumber = location.state?.orderNumber || "N/A"; 
    const orderDate = location.state?.orderDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const paymentMethod = location.state?.paymentMethod || "card";
    const courier = location.state?.courier || "N/A";
    const city = location.state?.city || "N/A";
    const amountPaid = location.state?.amountPaid || 0;
    const purchasedItems = location.state?.purchasedItems || [];
    const buyerDetails = location.state?.buyerDetails || {};

    useEffect(() => {
        if (!location.state) {
            console.warn("No receipt data found, redirecting...");
        }
    }, [location.state]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <style type="text/css" media="print">
                {`
                    @page { 
                        size: A4 portrait; 
                        margin: 10mm; 
                    }
                    /* Extra height / scrollbar remove kora hocche jate 2nd page na ashe */
                    html, body {
                        height: 100% !important;
                        min-height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        overflow: hidden !important;
                    }
                    /* Shob kichu hide kora hocche */
                    body * { 
                        visibility: hidden; 
                    }
                    /* Shudhu receipt visible kora hocche */
                    #premium-receipt, #premium-receipt * { 
                        visibility: visible; 
                    }
                    /* Receipt ke ekdom page er top-left e set kora hocche */
                    #premium-receipt {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 20px !important;
                        margin: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        box-sizing: border-box;
                    }
                    .no-print { 
                        display: none !important; 
                    }
                `}
            </style>

            <div className="bg-[#f0f2f5] min-h-screen py-10 px-4 font-sans flex justify-center print:bg-white print:py-0 print:px-0">
                <div className="w-full max-w-[850px]">
                    {/* top action bar */}
                    <div className="flex justify-between items-center mb-6 no-print">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="cursor-pointer flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-black transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
                        >
                            <FiChevronLeft className="text-lg" /> Back
                        </button>
                        <button 
                            onClick={handlePrint} 
                            className="cursor-pointer flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-all shadow-md active:scale-95"
                        >
                            <FiDownload className="text-base" /> Download PDF
                        </button>
                    </div>
                    {/* receipt paper */}
                    <div id="premium-receipt" className="bg-white p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                        {/* header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-8 border-b-2 border-black mb-10">
                            <div>
                                <h1 className="text-4xl font-black tracking-[0.2em] text-black uppercase mb-1">
                                    OREBI
                                </h1>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                    Official Purchase Receipt
                                </p>
                            </div>
                            <div className="mt-6 sm:mt-0 text-left sm:text-right">
                                <p className="text-3xl font-light text-gray-300 uppercase tracking-widest mb-1">
                                    Invoice
                                </p>
                                <p className="text-[12px] font-bold text-black uppercase tracking-widest">
                                    {orderNumber}
                                </p>
                            </div>
                        </div>
                        {/* customer & order meta information */}
                        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12 border-b border-gray-100 pb-10">
                            {/* billed to */}
                            <div className="flex-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 border-l-2 border-black pl-3">
                                    Billed To
                                </p>
                                <div className="pl-3.5">
                                    <p className="text-sm font-bold text-black uppercase mb-1">{buyerDetails.fullName || "Valued Customer"}</p>
                                    <p className="text-xs text-gray-600 mb-0.5">{buyerDetails.address}</p>
                                    <p className="text-xs text-gray-600 mb-0.5">{city}{buyerDetails.zipCode ? `, ${buyerDetails.zipCode}` : ''}</p>
                                    <p className="text-xs text-gray-600 mt-2">{buyerDetails.email}</p>
                                    <p className="text-xs text-gray-600">{buyerDetails.phone}</p>
                                </div>
                            </div>
                            {/* order details */}
                            <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-4">
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Date Issued</p>
                                    <p className="text-xs font-bold text-black">{orderDate}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Courier</p>
                                    <p className="text-xs font-bold text-black">{courier}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Payment Method</p>
                                    <p className="text-xs font-bold text-black uppercase">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Destination</p>
                                    <p className="text-xs font-bold text-black capitalize">{city}</p>
                                </div>
                            </div>
                        </div>
                        {/* items table */}
                        <div className="mb-12">
                            {/* table head */}
                            <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-4">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest w-[60%]">Description</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest w-[20%] text-center">Qty</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest w-[20%] text-right">Amount</p>
                            </div>
                            {/* table body */}
                            <div className="space-y-4">
                                {purchasedItems.length > 0 ? (
                                    purchasedItems.map((item, index) => (
                                        <div key={index} className="flex justify-between items-start pb-4 border-b border-gray-50 border-dashed">
                                            <div className="w-[60%] pr-4">
                                                <p className="text-[13px] font-bold text-gray-900">{item.title}</p>
                                                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Rate: ${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="w-[20%] text-center">
                                                <p className="text-[13px] font-medium text-gray-900">{item.quantity}</p>
                                            </div>
                                            <div className="w-[20%] text-right">
                                                <p className="text-[13px] font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 italic py-2">No items data available.</p>
                                )}
                            </div>
                        </div>
                        {/* calculation summary */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-1/2">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Subtotal</p>
                                    <p className="text-sm font-bold text-gray-900">${amountPaid.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between items-center mb-5">
                                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Shipping & Handling</p>
                                    <p className="text-sm font-bold text-gray-900">$0.00</p>
                                </div>
                                <div className="flex justify-between items-center border-t-2 border-black pt-4">
                                    <p className="text-sm text-black font-black uppercase tracking-widest">Total Paid</p>
                                    <p className="text-3xl font-black text-black">${amountPaid.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        {/* footer note */}
                        <div className="mt-20 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                            <div>
                                <p className="text-[11px] font-bold text-black uppercase tracking-widest mb-1">Thank You For Shopping</p>
                                <p className="text-[9px] text-gray-500 uppercase tracking-widest">Orebi E-Commerce Ltd. • Dhaka, Bangladesh</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Support: contact@orebistore.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Receipt;