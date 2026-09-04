import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiChevronLeft, FiMinus, FiPlus, FiTruck, FiShield, FiCheck, FiCheckCircle } from 'react-icons/fi';
import Container from '../Container';
import { Helmet } from 'react-helmet-async';
// Redux Imports
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/counter/cartSlice';

const IndividualProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.item;
    
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState(product?.thumbnail);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return (
            <Container className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <FiShoppingCart className="text-3xl text-gray-300" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">No Product Selected</h2>
                <button
                    onClick={() => navigate('/shop')}
                    className="px-8 py-3.5 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                    Return to Shop
                </button>
            </Container>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity }));
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    const jsonLdSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": product.images || [product.thumbnail],
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Premium Store"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            // eslint-disable-next-line react-hooks/purity
            "reviewCount": Math.floor(Math.random() * 100) + 10
        }
    };

    return (
        <div className="bg-white min-h-screen pb-16 md:pb-24 relative overflow-hidden font-sans">
            <Helmet>
                <title>{product.title} | Premium Store</title>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLdSchema)}
                </script>
            </Helmet>
            {/* breadcrumb & back nav */}
            <div className="border-b border-gray-100 bg-white mb-8 lg:mb-12">
                <Container className="px-4 lg:px-0 py-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[14px] text-[#767676] hover:text-black transition-colors"
                    >
                        <FiChevronLeft className="text-lg" />
                        Back to previous
                    </button>
                    <div className="hidden sm:flex items-center gap-2 text-[14px] text-[#767676]">
                        <Link to="/" className="hover:text-black transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-black font-medium">{product.title}</span>
                    </div>
                </Container>
            </div>
            <Container className="px-4 lg:px-0">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    {/* left side */}
                    <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 lg:gap-5">
                        {/* thumbnails */}
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible shrink-0 md:w-[90px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {product.images?.slice(0, 4).map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveImg(img)}
                                    className={`w-20 h-20 md:w-full md:h-[90px] shrink-0 cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 bg-[#F5F5F3] border-2 ${
                                        activeImg === img 
                                            ? 'border-gray-900' 
                                            : 'border-transparent hover:border-gray-300'
                                    }`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply p-2" />
                                </div>
                            ))}
                        </div>
                        {/* image */}
                        <div className="flex-1 bg-[#F5F5F3] rounded-[24px] relative flex items-center justify-center p-8 min-h-[350px] md:min-h-[500px]">
                            {product.discountPercentage > 0 && (
                                <div className="absolute top-6 left-6 bg-[#FF4545] text-white text-[12px] font-bold px-4 py-1.5 rounded-full z-10 shadow-sm tracking-wide">
                                    {Math.round(product.discountPercentage)}% OFF
                                </div>
                            )}
                            <img 
                                src={activeImg} 
                                alt={product.title} 
                                className="w-full max-h-[300px] md:max-h-[400px] object-contain mix-blend-multiply drop-shadow-xl" 
                            />
                        </div>
                    </div>
                    {/* right side */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="mb-4">
                            <h3 className="text-[12px] font-bold text-[#767676] uppercase tracking-[0.2em] mb-3">
                                {product.brand || 'VELVET TOUCH'}
                            </h3>
                            <h1 className="text-[32px] md:text-[40px] font-extrabold text-[#262626] leading-[1.1] tracking-tight mb-4">
                                {product.title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar 
                                        key={i} 
                                        className={`text-[15px] ${i < Math.round(product.rating) ? "fill-[#262626] text-[#262626]" : "text-gray-200"}`} 
                                    />
                                ))}
                            </div>
                            <span className="text-[14px] text-[#767676] font-medium pt-0.5">
                                {product.rating} / 5.0
                            </span>
                        </div>
                        <div className="flex items-end gap-4 mb-8">
                            <span className="text-[38px] md:text-[44px] font-bold text-[#262626] leading-none">
                                ${product.price}
                            </span>
                            {product.discountPercentage > 0 && (
                                <span className="text-[20px] text-[#A3A3A3] line-through font-medium mb-1">
                                    ${(product.price / (1 - (product.discountPercentage / 100))).toFixed(2)}
                                </span>
                            )}
                        </div>
                        <p className="text-[#767676] text-[15px] md:text-[16px] leading-[1.8] mb-10 md:pr-10">
                            {product.description}
                        </p>
                        {/* actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <div className="flex items-center justify-between border border-gray-200 rounded-full h-[54px] w-full sm:w-[150px] px-2 bg-white">
                                <button
                                    onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                                    className="cursor-pointer w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                >
                                    <FiMinus className="text-lg" />
                                </button>
                                <span className="font-bold text-[16px] text-black">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(prev => prev < (product.stock || 10) ? prev + 1 : prev)}
                                    className="cursor-pointer w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                                >
                                    <FiPlus className="text-lg" />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`cursor-pointer w-full sm:flex-1 h-12 sm:h-[54px] flex items-center justify-center gap-2 sm:gap-3 font-bold text-[14px] sm:text-[16px] rounded-full transition-all duration-300 outline-none ${
                                    isAdded 
                                    ? 'bg-[#10B981] text-white cursor-default scale-[0.98]' 
                                    : 'bg-[#262626] text-white cursor-pointer hover:bg-black hover:shadow-lg active:scale-[0.98]'
                                }`}
                            >
                                {isAdded ? (
                                    <>
                                        <FiCheckCircle className="text-lg sm:text-xl shrink-0" />
                                        <span className="truncate">Added to Cart</span>
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart className="text-lg sm:text-xl shrink-0" /> 
                                        <span className="truncate">Add to Cart</span>
                                    </>
                                )}
                            </button>
                        </div>
                        {/* features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5">
                                <div className="text-xl text-gray-800 shrink-0">
                                    <FiTruck />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-gray-900">Free Delivery</h4>
                                    <p className="text-[12px] text-gray-500 mt-1">Orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5">
                                <div className="text-xl text-gray-800 shrink-0">
                                    <FiShield />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-gray-900">Secure Transaction</h4>
                                    <p className="text-[12px] text-gray-500 mt-1">100% encrypted</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border border-gray-100 rounded-2xl p-5 sm:col-span-2">
                                <div className="text-xl text-gray-800 shrink-0">
                                    <FiCheck />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-gray-900">In Stock Ready to Ship</h4>
                                    <p className="text-[12px] text-gray-500 mt-1">{product.availabilityStatus || 'In Stock'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            {/* toast */}
            <div 
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 z-100 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
                    isAdded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
                }`}
            >
                <div className="bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center gap-4 w-[90vw] sm:w-auto sm:min-w-[280px] max-w-[400px]">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                        <FiCheckCircle className="text-green-400 text-xl" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="text-[14px] font-bold mb-0.5">Success!</h4>
                        <p className="text-[12px] text-gray-300 leading-tight truncate">
                            {quantity}x <span className="font-semibold text-white">{product.title}</span> added to cart
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualProduct;