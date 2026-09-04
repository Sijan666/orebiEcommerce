import React, { useEffect, useState } from "react";
import Container from "../Container";
import Product from '../Product';
import axios from "axios";
import { Link } from "react-router-dom";

// Swiper JS imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';

const Specialoffer = () => {
    const [offerData, setOfferData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOffers() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://dummyjson.com/products?limit=100");
                const sortedByHighestDiscount = response.data.products.sort(
                    (a, b) => b.discountPercentage - a.discountPercentage
                );
                const topOffers = sortedByHighestDiscount.slice(0, 8);
                setOfferData(topOffers);
            } catch (error) {
                console.error("Error fetching special offers:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOffers();
    }, []);

    return (
        <div className="pt-8 pb-10 md:pb-16 lg:pb-20">
            <Container className={'px-3 lg:px-0'}>
                <h3 className="text-[26px] md:text-[32px] lg:text-[39px] text-[#262626] font-bold block pb-5 lg:pb-[30px]">
                    Special Offers
                </h3>
                {isLoading ? (
                    <div className="flex justify-center items-center py-10 w-full">
                        <div className="w-8 h-8 border-4 border-[#262626] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="relative lg:-mx-2"> 
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={15}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.special-next',
                                prevEl: '.special-prev',
                            }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                480: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 20 },
                                1024: { slidesPerView: 4, spaceBetween: 30 },
                            }}
                            className="w-full pb-5"
                        >
                            {offerData.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="w-full">
                                        <Link 
                                            to={`/product/${item.id}`}
                                            state={{ item: item }} 
                                            className="block h-full cursor-pointer duration-300"
                                        >
                                            <Product 
                                                productImg={item.thumbnail} 
                                                badgeText={`-${Math.round(item.discountPercentage)}%`} 
                                                productTitle={item.title} 
                                                productPrice={`$${item.price}`}
                                            />
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* previous arrow */}
                        <button aria-label="Previous slide" className="special-prev absolute top-[40%] left-0 lg:-left-5 z-10 w-8 h-8 bg-gray-100 hover:bg-black text-black hover:text-white flex items-center justify-center rounded-full -translate-y-1/2 transition-all duration-300 shadow-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        {/* next arrow */}
                        <button aria-label="Next slide" className="special-next absolute top-[40%] right-0 lg:-right-5 z-10 w-8 h-8 bg-gray-100 hover:bg-black text-black hover:text-white flex items-center justify-center rounded-full -translate-y-1/2 transition-all duration-300 shadow-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Specialoffer;